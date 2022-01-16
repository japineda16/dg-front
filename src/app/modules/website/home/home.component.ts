import { Component, OnInit } from '@angular/core';
import {QueryService} from "@services/queries/query.service";
import {ActivatedRoute} from "@angular/router";
import {data} from "autoprefixer";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any;
  product: any;
  modalState: boolean = false;

  constructor(private query: QueryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.getRestaurants(data.restaurant);
    });
    this.product = {title: '', price: '', description: ''};
  }

  getRestaurants(resId: string): void {
    this.query.getQuery('restaurants/' + resId).subscribe(res => {
      this.data = res;
    }, error => {
      console.log(error);
    });
  }

  onOpenModal(title: any, image: any, price: any, description: any): void {
    this.product = {title, image, price, description};
    this.modalState = true;
  }

  onCloseModal(): void {
    this.modalState = false;
  }

}
