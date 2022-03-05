import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Restaurant} from "@interfaces/restaurant";
import {QueryService} from "@services/queries/query.service";

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  data: Restaurant;
  rest: string;
  cat: string;
  categories: any;
  product: any;
  openModal = false;
  z10 = true;

  constructor(private actRoute: ActivatedRoute, private query: QueryService) {
    this.actRoute.params.subscribe(res => {
      this.rest = res.restaurant;
      this.cat = res.category;
    });
    this.product = {title: '', price: '', description: ''};
  }

  ngOnInit(): void {
    this.getCategory();
    this.getRestaurants();
  }

  getCategory(): void {
    this.query.getQuery('categories/' + this.cat).subscribe(res => {
      this.categories = res;
    }, error => {
      console.log(error);
    });
  }

  getRestaurants(): void {
    this.query.getQuery('resturantTag/' + this.rest).subscribe(res => {
      this.data = res;
    }, error => {
      console.log(error);
    });
  }

  onOpenModal(title: string, price: string, description: string, image: string): void {
    this.openModal = true;
    this.z10 = false;
    this.product = {title, price, description, image};
  }

  onCloseModal() {
    this.z10 = false;
    this.openModal = false;
  }

}
