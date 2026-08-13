import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionResult } from './conversion-result';

describe('ConversionResult', () => {
  let component: ConversionResult;
  let fixture: ComponentFixture<ConversionResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversionResult],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversionResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
