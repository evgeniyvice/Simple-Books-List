import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/internal/Subscription'
import { BooksService } from '../../../../services/books/books.service'
import { Book } from '../../../../services/books/declarations/index'

type SortType = 'title_asc' | 'title_desc' | 'publish_asc' | 'publish_desc'
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnDestroy {

  public displayedColumns: string[] = ['title', 'authors', 'isbn', 'publish_year', 'delete']
  public books: Book[]
  public sortType: SortType = 'publish_asc'

  private routeSub: Subscription
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService
  ) {
    this.routeSub = this.route.queryParams.subscribe(async (queryParams) => {
      this.sortType = queryParams['sortType'] ? queryParams['sortType'] : this.sortType
      await this.updateBooksData()
    })
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }

  public changeSortType(): void {
    this.router.navigate([], {
      queryParams: {
        sortType: this.sortType
      }
    })
    this.sortBooks()
  }

  public async deleteBook(id: string): Promise {
    await this.booksService.deleteBook(id)
    await this.updateBooksData()
  }

  public async updateBooksData(): Promise {
    try {
      this.books = await this.booksService.getBooks()
      this.sortBooks()
    } catch (err) {
      console.warn(err)
    }
  }

  private sortBooks(): void {
    switch (this.sortType) {
      case 'publish_asc': this.sortByDate().reverse()
        break
      case 'publish_desc': this.sortByDate()
        break
      case 'title_asc': this.sortByTitle()
        break
      case 'title_desc': this.sortByTitle().reverse()
        break
    }
  }

  private sortByDate(): Book[] {
    return this.books.sort((a, b) => {
      return new Date(a.publish_year).getTime() - new Date(b.publish_year).getTime()
    })
  }

  private sortByTitle(): Book[] {
    return this.books.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1 }
      if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1 }
      return 0
    })
  }

}
