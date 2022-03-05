import { Component, OnInit } from '@angular/core';
import {Restaurant} from "@interfaces/restaurant";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {QueryService} from "@services/queries/query.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  prodId: string;
  restaurant: Restaurant;
  product: any;
  form: FormGroup;
  loading: boolean = false;
  imgSrc: any;
  restId: string;
  categories: any;
  env = environment;

  constructor(private actRoute: ActivatedRoute, private query: QueryService, private fb: FormBuilder) {
    this.actRoute.params.subscribe(res => {
      this.prodId = res.id;
      this.restId = res.rest;
    });
  }

  ngOnInit(): void {
    this.getProduct();
    this.getRestaurant();
    this.settingUpFormProduct();
  }

  getProduct(): void {
    this.query.getQuery('menu/' + this.prodId).subscribe(res => {
      console.log(res);
      this.product = res;
      this.restaurant = res.restaurant;
      this.settingUpFormProduct();
    }, error => {
      console.log(error);
    });
  }

  settingUpFormProduct(): void {
    this.form = this.fb.group({
      name: [this.product.name || '', Validators.required],
      image: [this.product.image],
      currency: [this.product.currency || '', Validators.required],
      description: [this.product.description || '', Validators.required],
      price: [this.product.price || '', Validators.required],
      category: [this.product.category.id || '', Validators.required],
    });
  }

  onFileChange(event: any): void {
    this.imgSrc = event.target.files[0] as File;
  }

  isLoading(): void {
    this.loading = !this.loading;
  }

  onSubmitData(): void {
    this.isLoading();
    if (this.form.valid) {
      this.query.putQuery('menu/' + this.prodId, this.form.value).subscribe(res => {
        if (this.imgSrc == undefined) {
          this.isLoading();
        }
        if (this.imgSrc != undefined) {
          this.onUploadPhoto(this.prodId);
        }
      }, error => {
        console.log(error);
        this.isLoading();
      });
    }
    if (!this.form.valid) {
      console.log('No vas pal baile');
      this.isLoading();
    }
  }

  onUploadPhoto(id: string): void {
    const data = new FormData();
    data.append('image', this.imgSrc);
    this.query.postQuery('menu/logo/' + id, data).subscribe(res => {
      this.settingUpFormProduct();
      this.isLoading();
      this.getProduct();
    }, error => {
      this.isLoading();
      console.log(error);
    });
  }

  getRestaurant(): void {
    this.query.getQuery('restaurants/'+this.restId).subscribe(res => {
      this.categories = res.category;
      console.log(this.categories);
    }, error => {
      console.log(error);
    })
  }

}
