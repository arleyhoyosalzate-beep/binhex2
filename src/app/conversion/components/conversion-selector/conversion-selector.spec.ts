import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversionType } from '../../models/conversion-type';
import { ConversionSelector } from './conversion-selector';

describe('ConversionSelector', () => {
  let component: ConversionSelector;
  let fixture: ComponentFixture<ConversionSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversionSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversionSelector);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('selectedConversion', 'binary-to-hex');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display five conversion buttons', () => {
    const element = fixture.nativeElement as HTMLElement;
    const buttons = element.querySelectorAll('.conversion-option');
    const activeButton = element.querySelector('[aria-pressed="true"]');

    expect(buttons.length).toBe(5);
    expect(activeButton?.getAttribute('data-conversion')).toBe('binary-to-hex');
  });

  it('should emit the selected conversion', () => {
    const emittedValues: ConversionType[] = [];

    component.selectedConversionChange.subscribe((value) => {
      emittedValues.push(value);
    });

    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('[data-conversion="decimal-to-binary"]');

    if (!(button instanceof HTMLButtonElement)) {
      throw new Error('Conversion button was not rendered');
    }

    button.click();

    expect(emittedValues).toEqual(['decimal-to-binary']);
  });
});
