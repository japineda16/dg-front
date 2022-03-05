import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateSesionComponent } from './validate-sesion/validate-sesion.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { ContactWhatsappComponent } from './contact-whatsapp/contact-whatsapp.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ValidateSesionComponent,
    TopNavbarComponent,
    ModalProductComponent,
    ContactWhatsappComponent
  ],
  exports: [
    ValidateSesionComponent,
    TopNavbarComponent,
    ModalProductComponent,
    ContactWhatsappComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class GeneralModule { }
