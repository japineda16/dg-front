import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-rest',
  templateUrl: './create-rest.component.html',
  styleUrls: ['./create-rest.component.css']
})
export class CreateRestComponent implements OnInit {

  @Input() modalState: boolean;
  @Input() title: string;
  @Output() close = new EventEmitter<boolean>();

  constructor() {
    this.modalState = false;
  }

  ngOnInit(): void {
  }

  modalActive(): void {
    this.modalState = !this.modalState;
  }

  onCloseModal(): void {
    this.close.emit(false);
  }

}
