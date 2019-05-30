import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BooksService } from '../../../../services/books/books.service'
import { Author } from '../../../../services/books/declarations/index'

// tslint:disable-next-line: no-var-requires
const uuid = require('uuid')

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent {

  public bookForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    isbn: new FormControl('', [
      Validators.required,
      Validators.pattern(/(?:ISBN(?:-1[03])?:?)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-]){3})[-0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-]){4})[-0-9]{17}$)(?:97[89][-]?)?[0-9]{1,5}[-]?[0-9]+[-]?[0-9]+[-]?[0-9X]/)
    ]),
    publish_year: new FormControl(null)
  })
  public authorForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
  })
  public formTouched = false

  public authors: Array<Author> = []
  constructor(
    private booksService: BooksService
  ) { }

  public addAuthor(): void {
    if (this.authorForm.invalid) { return }
    this.authors.push(this.authorForm.value)
  }

  public deleteAuthor(id: number): void {
    this.authors.splice(id, 1)
  }

  public addBook(): void {
    this.formTouched = true
    try {
      this.booksService.addBook({
        id: uuid(),
        title: this.bookForm.value['title'],
        authors: this.authors,
        isbn: this.bookForm.value['isbn'],
        publish_year: this.bookForm.value['publish_year']
      })
    } catch (err) {
      console.log(err)
    }
  }

}
