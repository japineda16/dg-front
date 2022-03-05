import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WebsiteComponent} from "./website.component";
import {HomeComponent} from "./home/home.component";
import {ProductCategoryComponent} from "./product-category/product-category.component";

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {
        component: HomeComponent,
        path: 'fair/:fair'
      },
      {
        component: HomeComponent,
        path: 'fair/restaurant/:restaurant'
      },
      {
        component: ProductCategoryComponent,
        path: 'fair/restaurant/:restaurant/category/:category'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }