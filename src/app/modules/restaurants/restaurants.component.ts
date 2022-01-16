import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.validateSession();
  }

  validateSession(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('user_token');
    if (user === null || token === null) {
      this.route.navigateByUrl('/auth/login');
    }
  }

}
