import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./modules/website/website.module').then((m) => {
        return m.WebsiteModule;
      });
    }
  },
  {
    path: 'auth',
    loadChildren: () => {
      return import('./modules/auth/auth.module').then((m) => {
        return m.AuthModule;
      });
    }
  },
  {
    path: 'dashboard',
    loadChildren: () => {
      return import('./modules/restaurants/restaurants.module').then((m) => {
        return m.RestaurantsModule;
      });
    }
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
