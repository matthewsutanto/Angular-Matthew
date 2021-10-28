import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { Country } from 'src/app/models/Country';
@Component({
  selector: 'app-country-detail-component',
  templateUrl: './country-detail-component.component.html',
  styleUrls: ['./country-detail-component.component.css']
})
export class CountryDetailComponentComponent implements OnInit {

  @Input() country:Country = {
    name:"United States",
    capital:"Washington D.C.",
    area:9525067,
    population: 325365189,
    gdp: 22.940,
    currency: "United States Dollar"
  };
  @Output() goBackEmiter = new EventEmitter();

  ngOnInit(): void {
  }

  goBack(){
    this.goBackEmiter.emit();
  }
}
