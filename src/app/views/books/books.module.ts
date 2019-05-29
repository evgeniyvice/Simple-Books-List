import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { BooksService } from '../../services/books/books.service'

import { BookCardComponent } from './components/index'
import { BookAddComponent, BookEditComponent, BookPageComponent, BooksComponent } from './pages/index'

const ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    pathMatch: 'full'
  },
  {
    path: '/:bookId',
    component: BookPageComponent,
    pathMatch: 'full'
  },
  {
    path: '/add',
    component: BookAddComponent,
    pathMatch: 'full'
  },
  {
    path: '/:bookId/edit',
    component: BookEditComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    BookPageComponent,
    BookAddComponent,
    BookEditComponent,
    BooksComponent,
    BookCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [BooksService]
})
export class BooksModule { }
