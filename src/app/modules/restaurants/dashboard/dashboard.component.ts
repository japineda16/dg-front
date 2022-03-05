import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { User } from "@interfaces/user"
import {QueryService} from "@services/queries/query.service";
import { UsernameValidator } from '@validators/username.validator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  createRest: boolean = false;
  form: FormGroup;
  imgSrc: any;
  user: User | any;
  restaurants: any;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private query: QueryService) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
    this.settingUpForm();
    this.getRestaurants();
  }

  openCreateRest(): void {
    this.createRest = !this.createRest;
  }

  settingUpForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required]],
      description: ['', Validators.required],
      image: [null, Validators.required],
      users: [this.user.id],
      address: ['', Validators.required],
      restaurantTag: ['', [Validators.required, UsernameValidator.cannotContainSpace]]
    });
  }

  onSubmitForm(): void {
    this.isLoading();
    this.form.value.phone = '58' + this.form.value.phone;
    this.query.postQuery('restaurants', this.form.value).subscribe(res => {
      this.onUploadLogo(res.id);
    }, error => {
      console.log(error);
      this.isLoading();
    });
  }

  onFileChange(event: any): void {
    this.imgSrc = event.target.files[0] as File;
  }

  onUploadLogo(id: string): void {
    const data = new FormData();
    data.append('image', this.imgSrc);
    this.query.postQuery('restaurant/logo/' + id, data).subscribe(res => {
      this.settingUpForm();
      this.isLoading();
      this.getRestaurants();
    }, error => {
      this.isLoading();
      console.log(error);
    });
  }

  getRestaurants(): void {
    this.query.getQuery('restaurants?where={"users":"' + this.user.id + '"}').subscribe(res => {
      this.restaurants = res;
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

  isLoading(): void {
    this.loading = !this.loading;
  }

}
