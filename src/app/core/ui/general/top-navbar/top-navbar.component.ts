import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "@interfaces/restaurant";

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  @Input() data: Restaurant;

  @Input() z10: boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.data.address);
  }

}
