import { Component, OnInit,Input ,Output ,EventEmitter } from '@angular/core';
import { Country } from 'src/app/models/Country';
@Component({
  selector: 'app-homecomponent',
  templateUrl: './homecomponent.component.html',
  styleUrls: ['./homecomponent.component.css']
})
export class HomecomponentComponent implements OnInit {
  @Input() multiCountry:Country[] = [];
  @Output() newItemEventHome = new EventEmitter<Country>();
  sortedCountryPol:Country[]=[];
  sortedCountryLar:Country[]=[];
  
  ngOnInit(): void {
    this.sortedCountryPol = this.multiCountry.sort((a, b) => (a.population > b.population ? -1 : 1));
    this.sortedCountryPol = this.sortedCountryPol.slice(0, 3);

    this.sortedCountryLar = this.multiCountry.sort((a, b) => (a.area > b.area ? -1 : 1));
    this.sortedCountryLar = this.sortedCountryLar.slice(0, 3);
  }

  viewCountryDetail(countryData:Country){
    this.newItemEventHome.emit(countryData);
  }
}
