import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RestModule} from "@ui/rest/rest.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RestaurantComponent } from './restaurant/restaurant.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({
  declarations: [
    RestaurantsComponent,
    DashboardComponent,
    RestaurantComponent,
    UpdateCategoryComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    RestModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RestaurantsModule { }
