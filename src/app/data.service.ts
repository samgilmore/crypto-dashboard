import { Injectable, Optional, SkipSelf } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allCoinData: any;
  selectedCoins: string[] = [];

  constructor(private _http: HttpClient, @Optional() @SkipSelf() sharedService?: DataService) { 
    if (sharedService) {
      throw new Error(
        'DataService is already loaded'
      );
      console.info('DataService created');
    }
  }

  fetchData() {

      let coins = this.selectedCoins.join(',');
    
      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ coins }&tsyms=USD&api_key={${ environment.apiKey }}`;
      //const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD&api_key={${environment.apiKey}}`;

      console.log(URL);

      //Make the API call
      return this._http.get<any>(URL);
  }

  testCryptoAPI() {
    let url = "http://localhost:8080/";
    return this._http.get(url, { responseType: "json" });
  }

  testBitcoin() {
    let url = "http://localhost:8080/data/bitcoin";
    return this._http.get(url, { responseType: "json" });
  }

}
