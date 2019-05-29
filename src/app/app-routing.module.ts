import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './views/home/home.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'books',
    loadChildren: './views/books/books.module#BooksModule'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // https://github.com/angular/angular/issues/15716#issuecomment-291025332
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
