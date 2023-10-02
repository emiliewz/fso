const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) return Book.find({}).populate('author', { name: 1, born: 1 })
      if (args.author && args.genre) return books.filter(b => b.author === args.author && b.genres.includes(args.genre))
      if (args.author) return books.filter(b => b.author === args.author)
      return Book.find({ genres: args.genre }).populate('author', { name: 1, born: 1 })
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },

  Author: {
    bookCount: ({ name }) => {
      const booksByAnthor = books.filter(b => b.author === name)
      return booksByAnthor.length
    }
  },

  Mutation: {
    addBook: async (root, { title, published, author, genres }, context) => {
      let book = new Book({ title, published, genres })
      const existedAuthor = await Author.findOne({ name: author })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      try {
        if (!existedAuthor) {
          const bookAuthor = new Author({ name: author })
          await bookAuthor.save()
          book.author = bookAuthor._id
        } else {
          book.author = existedAuthor._id
        }
        await book.save()
      } catch (error) {
        // throw new GraphQLError('Saving new book failed', {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: error.errors[0],
            error
          }
        })
      }

      const savedBook = await Book.findOne({ title }).populate('author', { name: 1, born: 1 })

      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

      return savedBook
    },

    editAuthor: async (root, args, context) => {
      const { name, setBornTo } = args
      const author = await Author.findOne({ name })
      if (!author) return null

      author.born = setBornTo
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      try {
        await author.save()
      } catch (error) {
        // throw new GraphQLError('Editing bornyear failed', {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: setBornTo,
            error
          }
        })
      }
      return author
    },

    createUser: async (root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: error.errors[0],
              error
            }
          })
        })
    },

    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },
}

module.exports = resolvers