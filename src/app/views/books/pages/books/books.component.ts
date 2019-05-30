import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/internal/Subscription'
import { BooksService } from '../../../../services/books/books.service'
import { Book } from '../../../../services/books/declarations/index'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['title', 'authors', 'isbn', 'publish_year']
  @ViewChild(MatSort) sort: MatSort
  public books: Book[]
  public dataSource: MatTableDataSource<Book>

  private routeSub: Subscription
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {
    this.routeSub = this.route.queryParams.subscribe(async (queryParams) => {
      await this.updateBooksData()
      this.dataSource = new MatTableDataSource(this.books)
      this.dataSource.sort = this.sort
    })
  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }

  public async updateBooksData(): Promise {
    try {
      this.books = await this.booksService.getBooks()
      console.log(this.books)
    } catch (err) {
      console.warn(err)
    }
  }

}
