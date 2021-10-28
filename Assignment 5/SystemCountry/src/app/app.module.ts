import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomecomponentComponent } from './components/homecomponent/homecomponent.component';
import { CountryDetailComponentComponent } from './components/country-detail-component/country-detail-component.component';
import { AllCountriesComponentComponent } from './components/all-countries-component/all-countries-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomecomponentComponent,
    CountryDetailComponentComponent,
    AllCountriesComponentComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
