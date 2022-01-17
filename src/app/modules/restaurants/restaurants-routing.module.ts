import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestaurantsComponent} from "./restaurants.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {UpdateCategoryComponent} from "./update-category/update-category.component";
import {UpdateProductComponent} from "./update-product/update-product.component";

const routes: Routes = [{
  path: '',
  component: RestaurantsComponent,
  children: [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'restaurant/:id',
      component: RestaurantComponent
    },
    {
      path: 'category/:id',
      component: UpdateCategoryComponent
    },
    {
      path: 'product/:id/:rest',
      component: UpdateProductComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
