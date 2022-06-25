import { Component, Input, OnInit } from '@angular/core';

import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ])
  ]
})
export class ListCardComponent implements OnInit {

  @Input() entry: any;
  @Input() chart_data: any;
  name: string;
  price: string;
  imgSrc: string;
  changeHr: string;
  changeDay: string;
  changeHrPositive: boolean = true;
  changeDayPositive: boolean = true;

  constructor() { 
  }

  ngOnInit(): void {
    this.name = this.entry[0];
    this.price = this.entry[1].USD.PRICE;
    this.imgSrc = `https://www.cryptocompare.com${this.entry[1].USD.IMAGEURL}`;

    this.changeHr = this.entry[1].USD.CHANGEPCTHOUR;
    this.changeDay = this.entry[1].USD.CHANGEPCTDAY;

    if (this.changeHr.includes('-')) {
      this.changeHr = this.changeHr.substring(1);
      this.changeHrPositive = false;
    }

    if (this.changeDay.includes('-')) {
      this.changeDay = this.changeDay.substring(1);
      this.changeDayPositive = false;
    }
  }
}
