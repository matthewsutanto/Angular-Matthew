import { Component, OnInit, Input } from '@angular/core';
import { Country } from './models/Country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SystemCountry';
  countryData:Country[]=[];
  isAllCountryShown:boolean=true;
  isCountryDetail:boolean=false;
  isHomepage:boolean=false;
  fromPage:string="";
  countryDetail:Country={
    name:"United States",
    capital:"Washington D.C.",
    area:9525067,
    population: 325365189,
    gdp: 22.940,
    currency: "United States Dollar"
  }

  ngOnInit() {
    this.countryData = [ 
      {
        name:"United States",
        capital:"Washington D.C.",
        area:9525067,
        population: 325365189,
        gdp: 22.940,
        currency: "United States Dollar"
      },
      {
        name:"China",
        capital:"Beijing",
        area:9596961,
        population: 1411778724,
        gdp: 16.64,
        currency: "Yuan"
      },
      {
        name:"Japan",
        capital:"Tokyo",
        area:377974,
        population: 125360000,
        gdp: 5.378,
        currency: "Yen"
      },
      {
        name:"Russia",
        capital:"Moskow",
        area:17098246,
        population: 146171015,
        gdp: 4.238,
        currency: "Russian Rubie"
      },
      {
        name:"Canada",
        capital:"Ottawa",
        area:9984670,
        population: 35151728,
        gdp: 1.529,
        currency: "Canadian Dollar"
      },
    ]
  }

  openDetailCountry(countryDetail: Country) {
    this.countryDetail= countryDetail;
    this.isAllCountryShown=false;
    this.isCountryDetail=true;
    this.fromPage="AllCountry";
    console.log(this.countryDetail.name);
    console.log(this.countryDetail.area);
  }

  openDetailCountryHome(countryDetail:Country) {
    this.countryDetail= countryDetail;
    this.isHomepage=false;
    this.isCountryDetail=true;
    this.fromPage="Homepage";
    console.log(this.countryDetail.name);
    console.log(this.countryDetail.area);
  }

  goBackEvent(){
    if(this.fromPage==="AllCountry"){
      this.isAllCountryShown=true;
      this.isCountryDetail=false;
    }else if(this.fromPage==="Homepage"){
      this.isHomepage=true;
      this.isCountryDetail=false;
    }
  }

  goHomepage(){
    this.isHomepage=true;
    this.isCountryDetail=false;
    this.isAllCountryShown=false;
    this.fromPage="";
  }

  goAllCountry(){
    this.isHomepage=false;
    this.isCountryDetail=false;
    this.isAllCountryShown=true;
    this.fromPage="";
  }
}
