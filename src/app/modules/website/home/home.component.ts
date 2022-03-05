import { Component, OnInit } from '@angular/core';
import {QueryService} from "@services/queries/query.service";
import {ActivatedRoute} from "@angular/router";
import {data} from "autoprefixer";
import { Restaurant } from '@interfaces/restaurant';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: Restaurant = {
    description: '',
    image: undefined,
    name: '',
    phone: 0,
    address: ' '
  };
  env = environment;
  cart: any[] = [];
  product: any;
  modalState: boolean = false;
  ids: any[];
  modalWhatsAppState: boolean = false;

  constructor(private query: QueryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.getRestaurants(data.restaurant);
    });
    this.product = {title: '', price: '', description: ''};
  }

  getRestaurants(resId: string): void {
    this.query.getQuery('resturantTag/' + resId).subscribe(res => {
      this.data = res;
    }, error => {
      console.log(error);
    });
  }

  onOpenModal(title: any, image: any, price: any, description: any, currency: any): void {
    this.product = {title, image, price, description, currency};
    this.modalState = true;
  }

  onOpenWhatsAppModal(): void {
    this.modalWhatsAppState = true;
  }

  onCloseWhatsAppModal(): void {
    this.modalWhatsAppState = false;
  }

  onCloseModal(): void {
    this.modalState = false;
  }

  onAddToCart(event: any): void {
    this.cart.push(event);
    let ids = this.cart.map(o => o.id);
    this.ids = ids;
    this.cart = this.cart.filter(({id}, index) => !ids.includes(id, index + 1));
  }

  onDeleteFromCart(menu: any): void {
    let index = this.cart.findIndex(obj => {
      return obj.id == menu.id;
    });
    this.cart.splice(index, 1);
    let indexId = this.ids.indexOf(menu.id);
    this.ids.splice(indexId, 1);
  }

}
