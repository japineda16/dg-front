import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QueryService} from "@services/queries/query.service";
import {Restaurant} from "@interfaces/restaurant";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from '@interfaces/category'
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  params: any;
  restaurant: Restaurant;
  createCategory: boolean = false;
  createProduct: boolean = false;
  formC: FormGroup;
  loading: boolean = false;
  formP: FormGroup;
  categories: Array<Category> = [];
  imgSrc: any;
  product: any;
  modalProduct = false;
  modalShare = false;
  elementType = NgxQrcodeElementTypes.URL;
  errorConnection = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrUrl: any;
  qrValue: any;

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private titleService: Title,
    private query: QueryService) {
      this.params = this.router.snapshot.paramMap.get('id');
      this.product = {title: '', price: '', description: ''};
  }

  onOpenModalProduct(title: string, price: string, description: string, image: string): void {
    this.product = {title, price, description, image}
    this.modalProduct = !this.modalProduct;
  }

  onCloseProductModal(): void {
    this.modalProduct = !this.modalProduct;
  }

  ngOnInit(): void {
    this.getRestaurant();
    this.settingUpFormCategory();
    this.settingUpFormProduct();
  }

  copyInputMessage(url: string){
    navigator.clipboard.writeText(url).then().catch(e => console.error(e));
  }

  getRestaurant(): void {
    this.query.getQuery('restaurants/' + this.params).subscribe(res => {
      this.titleService.setTitle(res.name);
      this.categories = res.category;
      this.restaurant = res;
      this.qrUrl = 'https://tusferias.com/local/' + res.restaurantTag;
    }, error => {
      console.log(error);
    });
  }

  onChangeCategory(): void {
    this.createCategory = !this.createCategory;
  }

  onChangeProduct(): void {
    this.createProduct = !this.createProduct;
  }

  onShareLocal(): void {
    this.modalShare = !this.modalShare;
  }

  settingUpFormCategory(): void {
    this.formC = this.fb.group({
      name: ['', Validators.required],
      restaurant: [this.params]
    });
  }

  onSubmitCategory(): void {
    if (this.formC.valid) {
      this.query.postQuery('categories', this.formC.value).subscribe(res => {
        this.getRestaurant();
        this.settingUpFormCategory();
      }, error => {
        console.log(error);
      });
    }
    if (!this.formC.valid) {
      console.log('No vas pal baile mijo');
    }
  }

  settingUpFormProduct(): void {
    this.formP = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      currency: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      featured: [false],
      restaurant: [this.params],
    });
  }

  onProductSubmit(): void {
    if (this.formP.valid) {
      this.query.postQuery('menu', this.formP.value).subscribe(res => {
        this.onUploadPhoto(res.id);
      }, error => {
        console.log(error);
      });
      this.isLoading();
    }
    if (!this.formP.valid) {
      console.log('no vas pal baile');
    }
  }

  onFileChange(event: any): void {
    this.imgSrc = event.target.files[0] as File;
  }

  onUploadPhoto(id: string): void {
    const data = new FormData();
    data.append('image', this.imgSrc);
    this.query.postQuery('menu/logo/' + id, data).subscribe(res => {
      this.settingUpFormProduct();
      this.isLoading();
      this.getRestaurant();
    }, error => {
      this.isLoading();
      console.log(error);
    });
  }

  isLoading(): void {
    this.loading = !this.loading;
  }

}
