import { Injectable } from '@angular/core'
import { LocalStorage } from '@ngx-pwa/local-storage'

import { Book } from './declarations/index'

@Injectable()
export class BooksService {

  constructor(
    private localStorage: LocalStorage
  ) { }

  public async addBook(book: Book): Promise<any> {
    const books = await this.getBooks()
    books.push(book)
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
