import { Injectable } from '@angular/core'
import { LocalStorage } from '@ngx-pwa/local-storage'

import { Book } from './declarations/index'

@Injectable()
export class BooksService {

  constructor(
    private localStorage: LocalStorage
  ) { }

  public async addBook(book: Book): Promise {
    const books = await this.getBooks()
    books.push(book)
    this.localStorage.setItem('books', books).toPromise()
  }

  public async deleteBook(id: string): Promise {
    const books = await this.getBooks()
    books.filter(book => book.id !== id)
    this.localStorage.setItem('books', books).toPromise()
  }

  public async editBook(book: Book): Promise {
    const books = await this.getBooks()
    books.map(item => {
      if (item.id === book.id) {
        item = book
      }
    })
    this.localStorage.setItem('books', books).toPromise()
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
