const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connection to MongoDB:', error.message))

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    books: [Book!]!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) return Book.find({}).populate('author', { name: 1, born: 1 })
      if (args.author && args.genre) return books.filter(b => b.author === args.author && b.genres.includes(args.genre))
      if (args.author) return books.filter(b => b.author === args.author)
      return books.filter(b => b.genres.includes(args.genre))
    },
    allAuthors: async () => Author.find({})
  },

  Author: {
    bookCount: ({ name }) => {
      const booksByAnthor = books.filter(b => b.author === name)
      return booksByAnthor.length
    }
  },

  Mutation: {
    addBook: async (root, { title, published, author, genres }) => {
      let book = new Book({ title, published, genres })

      const existedAuthor = await Author.findOne({ name: author })

      if (!existedAuthor) {
        const bookAuthor = new Author({ name: author })
        await bookAuthor.save()
        book.author = bookAuthor._id
      } else {
        book.author = existedAuthor._id
      }
      await book.save()

      return Book.findOne({ title }).populate('author', { name: 1, born: 1 })
    },

    editAuthor: async (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) return null

      const updatedAuthor = {
        ...author, born: args.setBornTo
      }
      authors = authors.map(a => a.name !== args.name ? a : updatedAuthor)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})