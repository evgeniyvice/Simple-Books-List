import { Author } from './author'

export interface Book {
  title: string
  authors: Array<Author>
  isbn: string
  publish_year?: Date
}
