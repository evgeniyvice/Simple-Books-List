import { Author } from './author'

export interface Book {
  id?: string
  title: string
  authors: Array<Author>
  isbn: string
  publish_year?: Date
}
