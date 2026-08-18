import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../../app.routes';
import { ConversionType } from '../../models/conversion-type';
import { ConverterPage } from './converter-page';

describe('ConverterPage', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  async function renderConversion(conversion: ConversionType): Promise<HTMLElement> {
    await harness.navigateByUrl(`/convert/${conversion}`, ConverterPage);

    const element = harness.routeNativeElement;

    if (!(element instanceof HTMLElement)) {
      throw new Error('Converter page was not rendered');
    }

    return element;
  }

  function getResult(element: HTMLElement): string {
    const output = element.querySelector('output');

    return output?.textContent?.trim() ?? '';
  }

  function enterValue(element: HTMLElement, value: string): void {
    const input = element.querySelector('input');

    if (!(input instanceof HTMLInputElement)) {
      throw new Error('Conversion input was not rendered');
    }

    input.value = value;
    input.dispatchEvent(new Event('input'));

    harness.detectChanges();
  }

  it('should create the routed converter page', async () => {
    const component = await harness.navigateByUrl('/convert/binary-to-hex', ConverterPage);

    expect(component).toBeTruthy();
  });

  it('should render only one conversion row', async () => {
    const element = await renderConversion('binary-to-hex');
    const rows = element.querySelectorAll('.conversion-row');

    expect(rows.length).toBe(1);
  });

  it('should select the conversion represented by the URL', async () => {
    const element = await renderConversion('decimal-to-binary');
    const activeButton = element.querySelector('[aria-pressed="true"]');

    expect(activeButton?.getAttribute('data-conversion')).toBe('decimal-to-binary');
  });

  it('should convert binary to hexadecimal', async () => {
    const element = await renderConversion('binary-to-hex');

    enterValue(element, '11111111');

    expect(getResult(element)).toBe('FF');
  });

  it('should convert binary to decimal', async () => {
    const element = await renderConversion('binary-to-decimal');

    enterValue(element, '1111');

    expect(getResult(element)).toBe('15');
  });

  it('should convert decimal to binary', async () => {
    const element = await renderConversion('decimal-to-binary');

    enterValue(element, '10');

    expect(getResult(element)).toBe('1010');
  });

  it('should convert decimal to hexadecimal', async () => {
    const element = await renderConversion('decimal-to-hex');

    enterValue(element, '255');

    expect(getResult(element)).toBe('FF');
  });

  it('should convert hexadecimal to binary', async () => {
    const element = await renderConversion('hex-to-binary');

    enterValue(element, 'AE');

    expect(getResult(element)).toBe('10101110');
  });

  it('should display an error for invalid hexadecimal', async () => {
    const element = await renderConversion('hex-to-binary');

    enterValue(element, 'G1');

    expect(getResult(element)).toBe('Valor inválido');
  });
});
