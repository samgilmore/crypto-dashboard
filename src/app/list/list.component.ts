import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ])
  ]
})
export class ListComponent implements OnInit {

  rawData: any;
  selectedCurrencies: Object[] = [];
  dateTime: Date;
  updated: boolean;
  raw_bitcoin_data: Object[] = [];

  refined_bitcoin_data: { 
    name: string,
    series: { name: Date, value: number }[]
  }[] = [{
    name: "Bitcoin",
    series: [
      // {name: new Date('2022-06-24T00:34:00.000Z'), value: 24.52},
      // {name: new Date('2022-06-24T20:21:00.000Z'), value: 45.24},
      // {name: new Date('2022-06-25T18:06:00.000Z'), value: 66.25},
      // {name: new Date('2022-06-26T12:35:00.000Z'), value: 69.24},
      // {name: new Date('2022-06-28T02:09:00.000Z'), value: 70.12}
    ]
  }];

  constructor(private dataService: DataService) { 
  }

  getData() {
    
    //Call to CryptoCompare API
    this.dataService.fetchData()
      .subscribe(
        (res: { DISPLAY: any; }) => {
          this.rawData = res.DISPLAY;

          if(this.rawData == undefined) {
            console.log("SELECT A COIN: ");
            this.selectedCurrencies = [];
            this.updated = false;
          } else {
            console.log("RAW: " + this.rawData);

            this.selectedCurrencies = [];

            Object.entries(this.rawData).forEach(entry => {
              console.log(entry);
              this.selectedCurrencies.push(entry);
            });

            this.updated = true;
            this.dateTime = new Date();
          }
        }
      );  

  }

  ngOnInit(): void {

    this.dateTime = new Date();
    this.updated = false;

    // console.log(this.dataService.testCryptoAPI());
    // this.dataService.testCryptoAPI().subscribe(
    //   (res) => {
    //     console.log(res);
    //   }
    // );

    
    this.dataService.testBitcoin().subscribe(
      (res) => {
        // console.log("BITCOIN DATA: ", res);

        Object.entries(res).forEach(entry => {
          // console.log(entry[1]);
          this.raw_bitcoin_data.push(entry[1]);
        });

        console.log((this.raw_bitcoin_data.length));
        // console.log(Object.values(this.hgh[3])[0]);
        // console.log(this.hgh[4].hasOwnProperty('price'));
        // console.log(Object.entries(this.hgh[0])[1][1]);

        for (let i = 0; i < this.raw_bitcoin_data.length; i++) {
          let name = Object.values(this.raw_bitcoin_data[i])[0];
          let value = Object.values(this.raw_bitcoin_data[i])[1];
          let date = new Date(name);
          this.refined_bitcoin_data[0].series.push({ name: date, value: value });
          // this.refined_bitcoin_data[i].name = Object.values(this.raw_bitcoin_data[i])[0];
          // console.log(this.refined_bitcoin_data[i].name);
          // console.log(Object.values(this.raw_bitcoin_data[i])[0]);
          // console.log(typeof Object.values(this.raw_bitcoin_data[i])[0]);
        }

        console.log(this.raw_bitcoin_data);
        console.log(this.refined_bitcoin_data);


      }
    );

  }

  formatDate(value: string) {
    const date = new Date(value);
    let ampm = "AM";

    let hours = date.getHours();
    if (hours > 12) {
      hours = hours - 12;
      ampm = "PM";
    }

    let minutes = "";
    if (date.getMinutes() < 10) {
      minutes = "0" + date.getMinutes();
    } else {
      minutes = date.getMinutes().toString();
    }

    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${hours}:${minutes} ${ampm}`;
  }

}
