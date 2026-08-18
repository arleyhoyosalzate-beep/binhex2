import { Component, input, output } from '@angular/core';
import { ConversionType } from '../../models/conversion-type';

interface ConversionOption {
  readonly value: ConversionType;
  readonly label: string;
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
      label: 'Binario → hexadecimal',
    },
    {
      value: 'binary-to-decimal',
      label: 'Binario → decimal',
    },
    {
      value: 'decimal-to-binary',
      label: 'Decimal → binario',
    },
    {
      value: 'decimal-to-hex',
      label: 'Decimal → hexadecimal',
    },
    {
      value: 'hex-to-binary',
      label: 'Hexadecimal → binario',
    },
  ];

  protected handleSelection(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value as ConversionType;

    this.selectedConversionChange.emit(selectedValue);
  }
}