import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {QueryService} from "@services/queries/query.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  modalState: boolean;
  error: boolean = false;
  message: string = '';

  constructor(private fb: FormBuilder, private query: QueryService, private router: Router) {
    this.modalState = false;
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void { }

  onSubmitForm(): any {
    this.modalState = true;
    this.error = false;
    if (this.form.valid) {
      if (this.form.value.password === this.form.value.repeatPassword) {
        this.form.value.email = this.form.value.email.toLowerCase();
        this.query.postQuery('auth/signup', this.form.value).subscribe(res => {
          console.log(res);
          this.onLoginAfterSubmit();
        }, error => {
          console.log(error);
          this.modalState = false;
          this.error = true;
          this.message = 'Hubo un error, por favor vuelva a intentarlo.';
        });
      }
      if (this.form.value.password !== this.form.value.repeatPassword) {
        this.modalState = false;
        this.error = true;
        this.message = 'Las contrasenas no coinciden.';
        console.log('La contrasena no coinciden');
      }
    }
    if (!this.form.valid) {
      this.modalState = false;
      this.error = true;
      this.message = 'Uno de los campos ingresado no es valido.';
      console.log('Un campo no es valido');
    }
  }

  onLoginAfterSubmit(): void {
    this.query.postQuery('auth/login', this.form.value).subscribe( res => {
      delete res.user.password;
      localStorage.setItem('user_token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.router.navigateByUrl('/dashboard');
      this.modalState = false;
    }, error => {
      console.log(error);
    });
  }

}
