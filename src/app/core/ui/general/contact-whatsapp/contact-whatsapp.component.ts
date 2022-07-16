import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { QueryService } from '@services/queries/query.service';

@Component({
  selector: 'app-contact-whatsapp',
  templateUrl: './contact-whatsapp.component.html',
  styleUrls: ['./contact-whatsapp.component.css']
})
export class ContactWhatsappComponent implements OnInit {

  @Input() modalState: boolean;
  @Input() data: any;
  @Input() phone: number;
  @Input() business: any;
  @Output() close = new EventEmitter<boolean>();
  public form: FormGroup;

  constructor(private fb: FormBuilder, private query: QueryService, private router: Router) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.email, Validators.minLength(5)])
    });
  }

  ngOnInit(): void {
  }

  onSubmitWhatsApp(): void {
    console.log(this.data);
    if (this.form.valid) {
      this.form.value.data = this.data;
      let link = 'https://api.whatsapp.com/send/?phone=' + this.phone + '&text=¡Hola! Mi nombre es ' + this.form.value.name
      + ' vengo de %2Akatalogo.vip/local/' + this.business.restaurantTag + '%2A estoy interesado en contactarte... Me gustaria ordenar';
      if (this.form.value.data.length > 0) {
        let order = '';
        this.form.value.data.forEach((e: any) => {
          order += '%0A' + e.name;
        });
        link += order;
      }
      window.open(link);
    }
  }

  modalActive(): void {
    this.modalState = !this.modalState;
  }

  onCloseModal(): void {
    this.close.emit(false);
  }

}
