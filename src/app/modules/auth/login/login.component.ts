import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QueryService} from "@services/queries/query.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private query: QueryService, private router: Router) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  isLoading: boolean = false;
  errMsg = '';
  err = false;

  onSubmitForm(): void {
    this.isLoading = true;
    this.err = false;
    this.errMsg = '';
    if (this.form.valid) {
      this.query.postQuery('auth/login', this.form.value).subscribe(res => {
        delete res.user.password;
        this.isLoading = false;
        localStorage.setItem('user_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigateByUrl('/dashboard');
      }, error => {
        this.isLoading = false;
        this.err = true;
        this.errMsg = 'Ha habido un problema, por favor, intentelo de nuevo.';
        console.log(error);
      });
    }
    if (!this.form.valid) {
      this.err = true;
      this.isLoading = false;
      this.errMsg = 'Formulario no valido';
    }
  }

  ngOnInit(): void { }

}
