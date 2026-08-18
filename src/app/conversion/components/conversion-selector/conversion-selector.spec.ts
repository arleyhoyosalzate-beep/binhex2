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

    fixture.componentRef.setInput(
      'selectedConversion',
      'binary-to-hex',
    );

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display five conversion options', () => {
    const element = fixture.nativeElement as HTMLElement;
    const select = element.querySelector('select');
    const options = element.querySelectorAll('option');

    expect(options.length).toBe(5);
    expect(select?.value).toBe('binary-to-hex');
  });

  it('should emit the selected conversion', () => {
    const emittedValues: ConversionType[] = [];

    component.selectedConversionChange.subscribe((value) => {
      emittedValues.push(value);
    });

    const element = fixture.nativeElement as HTMLElement;
    const select = element.querySelector('select');

    if (!(select instanceof HTMLSelectElement)) {
      throw new Error('Conversion select was not rendered');
    }

    select.value = 'decimal-to-binary';
    select.dispatchEvent(new Event('change'));

    expect(emittedValues).toEqual(['decimal-to-binary']);
  });
});