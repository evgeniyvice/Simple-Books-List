import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs/internal/Subscription'
import { MessageDialogComponent } from '../../../../dialogs/index'
import { BooksService } from '../../../../services/books/books.service'
import { Book } from '../../../../services/books/declarations/index'

// tslint:disable-next-line: no-var-requires
const uuid = require('uuid')

type ButtonType = 'add' | 'edit'

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnDestroy {
  public authorForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    last_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  })

  public minDate = new Date(1980, 1, 1)
  public book: Book = {
    id: uuid(),
    title: '',
    authors: [],
    isbn: '',
    publish_year: null
  }
  public formTouched = false

  public buttonType: ButtonType = 'add'

  private routeSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private dialog: MatDialog
  ) {
    this.routeSub = this.route.params.subscribe(async ({ bookId }: Params) => {
      if (bookId) {
        this.book = await this.booksService.getBookById(bookId)
        this.buttonType = 'edit'
      }
    })
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }

  public addAuthor(): void {
    if (this.authorForm.invalid) { return }
    this.book.authors.push(this.authorForm.value)
    this.authorForm.reset()
  }

  public deleteAuthor(id: number): void {
    this.book.authors.splice(id, 1)
  }

  public openDialog(message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent)
    dialogRef.componentInstance.message = message
  }

  public addBook(form: NgForm): void {
    this.formTouched = true
    if (form.invalid) { return }
    try {
      this.booksService.addBook(this.book)
    } catch (err) {
      console.warn(err)
      this.openDialog('Упс! Что-то пошло не так, попробуйте снова')
    } finally {
      this.openDialog('Книга добавлена!')
    }
  }

  public editBook(form: NgForm): void {
    this.formTouched = true
    if (form.invalid) { return }
    try {
      this.booksService.editBook(this.book)
    } catch (err) {
      console.warn(err)
      this.openDialog('Упс! Что-то пошло не так, попробуйте снова')
    } finally {
      this.openDialog('Книга отредактирована!')
    }
  }

}
