import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';
import { CreateRestComponent } from './create-rest/create-rest.component';



@NgModule({
    declarations: [
        BottomNavbarComponent,
        CreateRestComponent
    ],
  exports: [
    BottomNavbarComponent,
    CreateRestComponent
  ],
    imports: [
        CommonModule
    ]
})
export class RestModule { }
