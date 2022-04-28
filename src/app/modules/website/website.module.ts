import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { HomeComponent } from './home/home.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import {GeneralModule} from "@ui/general/general.module";


@NgModule({
  declarations: [
    WebsiteComponent,
    HomeComponent,
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    GeneralModule
  ]
})
export class WebsiteModule { }
