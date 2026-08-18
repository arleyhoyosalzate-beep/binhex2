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

    fixture.componentRef.setInput('label', 'Hexadecimal');
    fixture.componentRef.setInput('value', 'AE');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the received label and value', () => {
    const element = fixture.nativeElement as HTMLElement;
    const label = element.querySelector('span');
    const output = element.querySelector('output');

    expect(label?.textContent?.trim()).toBe('Hexadecimal');
    expect(output?.textContent?.trim()).toBe('AE');
  });
});