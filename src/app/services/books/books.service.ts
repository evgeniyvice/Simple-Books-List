import { Injectable } from '@angular/core'
import { LocalStorage } from '@ngx-pwa/local-storage'

import { Book } from './declarations/index'

@Injectable()
export class BooksService {

  constructor(
    private localStorage: LocalStorage
  ) { }

  public async getBookById(id: string): Promise<Book> {
    const books = await this.getBooks()
    return books.find(book => book.id === id)
  }

  public async addBook(book: Book): Promise {
    const books = await this.getBooks()
    books.push(book)
    this.localStorage.setItem('books', books).toPromise()
  }

  public async deleteBook(id: string): Promise {
    const books = await this.getBooks()
    const newbooks = books.filter(book => book.id !== id)
    this.localStorage.setItem('books', newbooks).toPromise()
  }

  public async editBook(book: Book): Promise {
    const books = await this.getBooks()
    const newbooks = books.map(item => {
      if (item.id === book.id) {
        item = book
      }
      return item
    })
    this.localStorage.setItem('books', newbooks).toPromise()
  }

  public async getBooks(): Promise<Book[]> {
    const books: Book[] = await this.localStorage.getItem('books').toPromise()
    if (books) {
      return books
    } else {
      return []
    }
  }
}
