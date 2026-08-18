import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ConversionResult } from '../../components/conversion-result/conversion-result';
import { NumberInput } from '../../components/number-input/number-input';

@Component({
  selector: 'app-converter-page',
  imports: [NgTemplateOutlet, NumberInput, ConversionResult],
  templateUrl: './converter-page.html',
  styleUrl: './converter-page.scss',
})
export class ConverterPage {
  protected readonly binaryToHexValue = signal('10101110');
  protected readonly binaryToDecimalValue = signal('10101110');

  protected readonly hexadecimalResult = computed(() =>
    this.convertBinaryToHexadecimal(this.binaryToHexValue()),
  );

  protected readonly decimalResult = computed(() =>
    this.convertBinaryToDecimal(this.binaryToDecimalValue()),
  );

  protected readonly updateBinaryToHexValue = (value: string): void => {
    this.binaryToHexValue.set(value);
  };

  protected readonly updateBinaryToDecimalValue = (value: string): void => {
    this.binaryToDecimalValue.set(value);
  };

  private convertBinaryToHexadecimal(value: string): string {
    if (!this.isValidBinary(value)) {
      return 'Valor inválido';
    }

    const decimalValue = Number.parseInt(value, 2);

    return decimalValue.toString(16).toUpperCase();
  }

  private convertBinaryToDecimal(value: string): string {
    if (!this.isValidBinary(value)) {
      return 'Valor inválido';
    }

    return Number.parseInt(value, 2).toString();
  }

  private isValidBinary(value: string): boolean {
    return /^[01]+$/.test(value);
  }
}