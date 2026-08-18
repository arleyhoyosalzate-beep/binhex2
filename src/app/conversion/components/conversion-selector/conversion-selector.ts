import { Component, input, output } from '@angular/core';
import { ConversionType } from '../../models/conversion-type';

interface ConversionOption {
  readonly value: ConversionType;
  readonly label: string;
  readonly abbreviation: string;
}

@Component({
  selector: 'app-conversion-selector',
  imports: [],
  templateUrl: './conversion-selector.html',
  styleUrl: './conversion-selector.scss',
})
export class ConversionSelector {
  readonly selectedConversion = input.required<ConversionType>();

  readonly selectedConversionChange = output<ConversionType>();

  protected readonly options: readonly ConversionOption[] = [
    {
      value: 'binary-to-hex',
      label: 'Binario a hexadecimal',
      abbreviation: 'BIN → HEX',
    },
    {
      value: 'binary-to-decimal',
      label: 'Binario a decimal',
      abbreviation: 'BIN → DEC',
    },
    {
      value: 'decimal-to-binary',
      label: 'Decimal a binario',
      abbreviation: 'DEC → BIN',
    },
    {
      value: 'decimal-to-hex',
      label: 'Decimal a hexadecimal',
      abbreviation: 'DEC → HEX',
    },
    {
      value: 'hex-to-binary',
      label: 'Hexadecimal a binario',
      abbreviation: 'HEX → BIN',
    },
  ];

  protected selectConversion(conversion: ConversionType): void {
    this.selectedConversionChange.emit(conversion);
  }
}
