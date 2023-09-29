import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      # bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
      }
      id
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
      }
      id
      genres
    }
  }
`

export const EDIT_BORN_YEAR = gql`
  mutation editBirthYear($name: String!, $born: Int!){
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      name
      id
      born
      bookCount
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($loginUsername: String!, $favoriteGenre: String!) {
    createUser(
      username: $loginUsername, 
      favoriteGenre: $favoriteGenre
    ) {
      favoriteGenre
      id
      username
    }
  }
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

