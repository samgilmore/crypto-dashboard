import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {

  dropdownList: { item_id: string; item_text: string; }[];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: string[] = [];

  constructor() { 
  }

  ngOnInit(): void {
    this.dropdownList = [
      { item_id: "BTC", item_text: 'Bitcoin (BTC)' },
      { item_id: "ETH", item_text: 'Ethereum (ETH)' },
      { item_id: "XRP", item_text: 'Ripple (XRP)' },
      { item_id: "LTC", item_text: 'Litecoin (LTC)' },
      { item_id: "BCH", item_text: 'Bitcoin Cash (BCH)' },
      { item_id: "XLM", item_text: 'Stellar (XLM)' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true
    }
  }

  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems.push(item.item_id);
  }

  onItemDeSelect(item: any) {
    let index = this.selectedItems.indexOf(item.item_id);
    console.log("Removing: " + this.selectedItems[index]);

    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
  }

  onSelectAll() {
    this.selectedItems = ["BTC","ETH","XRP","LTC","BCH","XLM"];
  }

  onDeSelectAll() {
    this.selectedItems = [];
  }

}
