import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCountriesComponentComponent } from './all-countries-component.component';

describe('AllCountriesComponentComponent', () => {
  let component: AllCountriesComponentComponent;
  let fixture: ComponentFixture<AllCountriesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCountriesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCountriesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
