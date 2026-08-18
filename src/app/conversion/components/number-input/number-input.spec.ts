import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberInput } from './number-input';

describe('NumberInput', () => {
  let component: NumberInput;
  let fixture: ComponentFixture<NumberInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberInput],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberInput);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'Binario');
    fixture.componentRef.setInput('inputId', 'test-binary-input');
    fixture.componentRef.setInput('value', '1010');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the received label and value', () => {
    const element = fixture.nativeElement as HTMLElement;
    const label = element.querySelector('label');
    const input = element.querySelector('input');

    expect(label?.textContent?.trim()).toBe('Binario');
    expect(input?.value).toBe('1010');
    expect(input?.id).toBe('test-binary-input');
  });

  it('should emit the value entered by the user', () => {
    const emittedValues: string[] = [];

    component.valueChange.subscribe((value) => {
      emittedValues.push(value);
    });

    const element = fixture.nativeElement as HTMLElement;
    const input = element.querySelector('input');

    if (!(input instanceof HTMLInputElement)) {
      throw new Error('Input element was not rendered');
    }

    input.value = '1111';
    input.dispatchEvent(new Event('input'));

    expect(emittedValues).toEqual(['1111']);
  });
});