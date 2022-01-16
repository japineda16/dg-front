import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {

  @Input() modalState: boolean;
  @Input() title: string;
  @Input() price: string;
  @Input() description: string;
  @Input() image: string;
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
