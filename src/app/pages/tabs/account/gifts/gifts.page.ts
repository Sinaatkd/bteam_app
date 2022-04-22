import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.page.html',
  styleUrls: ['./gifts.page.scss'],
})
export class GiftsPage implements OnInit {

  segmentValue: 'gifts' | 'discounts' = 'gifts';
  
  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event) {
    this.segmentValue = event.detail.value;
  }

}
