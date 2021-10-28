import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Country } from 'src/app/models/Country';

@Component({
  selector: 'app-all-countries-component',
  templateUrl: './all-countries-component.component.html',
  styleUrls: ['./all-countries-component.component.css']
})
export class AllCountriesComponentComponent implements OnInit {
  @Input() countries:Country[] = [];
  @Output() newItemEvent = new EventEmitter<Country>();
  
  ngOnInit(): void {
  }

  viewCountryDetail(countryData:Country){
    this.newItemEvent.emit(countryData);
  }
}
