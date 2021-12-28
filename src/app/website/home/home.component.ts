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

  constructor(private query: QueryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.getRestaurants(data.fair);
    });
  }

  getRestaurants(resId: string): void {
    this.query.getQuery('fair/' + resId).subscribe(res => {
      this.data = res;
      console.log(this.data);
    }, error => {
      console.log(error);
    });
  }

}
