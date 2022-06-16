import { Injectable, Optional, SkipSelf } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allCoinData: any;

  constructor(private _http: HttpClient, @Optional() @SkipSelf() sharedService?: DataService) { 
    if (sharedService) {
      throw new Error(
        'DataService is already loaded'
      );
      console.info('DataService created');
    }
  }

  fetchData() {

    const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,LTC,BCH,XLM&tsyms=USD&api_key={${environment.apiKey}}`;
    //const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD&api_key={${environment.apiKey}}`;
    let params = new HttpParams();

    //Make the API call (NEW)
    return this._http.get<any>(URL, {params})
      .pipe(map( data => this.allCoinData = data));
  }

}
