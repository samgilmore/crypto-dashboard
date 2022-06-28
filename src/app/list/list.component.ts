import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { single } from 'rxjs';
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
  selectedCurrencies: Object[];

  dateTime: Date;
  updated: boolean;

  raw_bitcoin_data: Object[] = [];

  allRefinedGraphData: Object[] = [];

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

    console.log(this.dataService.testCryptoAPI());
    this.dataService.testCryptoAPI().subscribe(
      (res) => {
        console.log(res);
      }
    );
    
    this.dataService.testBitcoin().subscribe(
      (res) => {

        Object.entries(res).forEach(entry => {
          this.raw_bitcoin_data.push(entry[1]);
        });

        // console.log((this.raw_bitcoin_data.length));

        for (let i = 0; i < this.raw_bitcoin_data.length; i++) {
          //console.log("up",this.raw_bitcoin_data[i]);
          let name = Object.values(this.raw_bitcoin_data[i])[0];
          let value = Object.values(this.raw_bitcoin_data[i])[1];
          let date = new Date(name);
          this.refined_bitcoin_data[0].series.push({ name: date, value: value });
        }
        // console.log(this.raw_bitcoin_data);
        console.log(this.refined_bitcoin_data);
      }
    );

    this.dataService.fetchAllGraphData().subscribe(
      (res) => {
        console.log("THIS:" , (res));

        // const coinKeys = ["BTC","ETH","XRP","LTC","BCH","XLM"];
        const coinKeys = ["BTC","ETH"];

        for (let i = 0; i < coinKeys.length; i++) {
          
          let singleCoin: { 
            name: string,
            series: { name: Date, value: number }[]
          }[] = [{
            name: coinKeys[i],
            series: []
          }]; 

          let rawSingleCoin = Object.entries(res)[i][1];
          console.log("RAW", rawSingleCoin);

          for (let j = 0; j < rawSingleCoin.length; j++) {
            let name: string = rawSingleCoin[j].date;
            let value: number = rawSingleCoin[j].price;
            let date = new Date(name);
            singleCoin[0].series.push({ name: date, value: value });
          }

          console.log(singleCoin);
          this.allRefinedGraphData.push(singleCoin);
        }

        console.log(this.allRefinedGraphData);
      }
    );

  }
}
