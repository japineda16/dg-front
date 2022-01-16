import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateSesionComponent } from './validate-sesion/validate-sesion.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { ModalProductComponent } from './modal-product/modal-product.component';



@NgModule({
  declarations: [
    ValidateSesionComponent,
    TopNavbarComponent,
    ModalProductComponent
  ],
  exports: [
    ValidateSesionComponent,
    TopNavbarComponent,
    ModalProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GeneralModule { }
