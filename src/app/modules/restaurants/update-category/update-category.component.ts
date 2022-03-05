import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QueryService} from "@services/queries/query.service";
import {Restaurant} from "@interfaces/restaurant";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  catId: string;
  restaurant: Restaurant;
  category: any;
  form: FormGroup;
  loading: boolean = false;
  imgSrc: any;
  env = environment;

  constructor(private actRoute: ActivatedRoute, private query: QueryService, private fb: FormBuilder) {
    this.actRoute.params.subscribe(res => this.catId = res.id);
  }

  ngOnInit(): void {
    this.getCategory();
    this.settingUpFormProduct();
  }

  getCategory(): void {
    this.query.getQuery('categories/' + this.catId).subscribe(res => {
      console.log(res);
      this.category = res;
      this.restaurant = res.restaurant;
      this.settingUpFormProduct();
    }, error => {
      console.log(error);
    });
  }

  settingUpFormProduct(): void {
    this.form = this.fb.group({
      name: [this.category.name || '', Validators.required],
      image: ['']
    });
  }

  onFileChange(event: any): void {
    this.imgSrc = event.target.files[0] as File;
  }

  onSubmitData(): void {
    this.isLoading();
    if (this.form.valid) {
      this.query.putQuery('categories/' + this.catId, this.form.value).subscribe(res => {
        if (this.imgSrc == undefined) {
          this.isLoading();
        }
        if (this.imgSrc != undefined) {
          this.onUploadPhoto(this.catId);
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
    this.query.postQuery('categories/logo/' + id, data).subscribe(res => {
      this.settingUpFormProduct();
      this.isLoading();
      this.getCategory();
    }, error => {
      this.isLoading();
      console.log(error);
    });
  }

  isLoading(): void {
    this.loading = !this.loading;
  }

}
