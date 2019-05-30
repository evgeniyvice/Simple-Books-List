import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { MaterialModule } from '../../material/material.module'

import { BooksService } from '../../services/books/books.service'

import { MessageDialogComponent } from '../../dialogs/index'
import { BookAddComponent, BooksComponent } from './pages/index'

const ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: BookAddComponent,
    pathMatch: 'full'
  },
  {
    path: ':bookId/edit',
    component: BookAddComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    BookAddComponent,
    BooksComponent,
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [BooksService],
  entryComponents: [MessageDialogComponent]
})
export class BooksModule { }
