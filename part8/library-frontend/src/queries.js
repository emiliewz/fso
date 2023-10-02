import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
    }
    id
    genres
  }
`

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    id
    born
    # bookCount
  }
`

const USER_DETAILS = gql`
  fragment UserDetails on User {
    username
    favoriteGenre
    id
  }  
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String){
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_BORN_YEAR = gql`
  mutation editBirthYear($name: String!, $born: Int!){
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const CREATE_USER = gql`
  mutation createUser($loginUsername: String!, $favoriteGenre: String!) {
    createUser(
      username: $loginUsername, 
      favoriteGenre: $favoriteGenre
    ) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`
export const ME = gql`
  query {
    me {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`
