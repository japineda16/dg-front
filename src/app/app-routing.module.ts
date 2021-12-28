import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./website/website.module').then((m) => {
        return m.WebsiteModule;
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
