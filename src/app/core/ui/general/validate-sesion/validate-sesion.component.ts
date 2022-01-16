import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-validate-sesion',
  templateUrl: './validate-sesion.component.html',
  styleUrls: ['./validate-sesion.component.css']
})
export class ValidateSesionComponent implements OnInit {

  @Input() modalState: boolean;

  constructor() {
    this.modalState = false;
  }

  ngOnInit(): void {
  }

  modalActive(): void {
    this.modalState = !this.modalState;
  }

}
