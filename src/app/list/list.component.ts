import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  rawData: any;
  selectedCurrencies: Object[] = [];
  dateTime: Date;
  updated: boolean;

  constructor(private dataService: DataService) { 
  }

  getData() {

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

  }

}
