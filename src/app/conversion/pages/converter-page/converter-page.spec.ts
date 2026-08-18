import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConverterPage } from './converter-page';

describe('ConverterPage', () => {
  let component: ConverterPage;
  let fixture: ComponentFixture<ConverterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConverterPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ConverterPage);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  function getRows(): NodeListOf<HTMLElement> {
    return fixture.nativeElement.querySelectorAll('.conversion-row');
  }

  function getResult(rowIndex: number): string {
    const output = getRows()[rowIndex].querySelector('output');

    return output?.textContent?.trim() ?? '';
  }

  async function enterValue(
    rowIndex: number,
    value: string,
  ): Promise<void> {
    const input = getRows()[rowIndex].querySelector('input');

    if (!(input instanceof HTMLInputElement)) {
      throw new Error(`Input was not found in row ${rowIndex}`);
    }

    input.value = value;
    input.dispatchEvent(new Event('input'));

    await fixture.whenStable();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render five conversion rows', () => {
    expect(getRows().length).toBe(5);
  });

  it('should convert binary to hexadecimal', async () => {
    await enterValue(0, '11111111');

    expect(getResult(0)).toBe('FF');
  });

  it('should convert binary to decimal', async () => {
    await enterValue(1, '1111');

    expect(getResult(1)).toBe('15');
  });

  it('should convert decimal to binary', async () => {
    await enterValue(2, '10');

    expect(getResult(2)).toBe('1010');
  });

  it('should convert decimal to hexadecimal', async () => {
    await enterValue(3, '255');

    expect(getResult(3)).toBe('FF');
  });

  it('should convert hexadecimal to binary', async () => {
    await enterValue(4, 'AE');

    expect(getResult(4)).toBe('10101110');
  });

  it('should display an error for an invalid hexadecimal value', async () => {
    await enterValue(4, 'G1');

    expect(getResult(4)).toBe('Valor inválido');
  });
});