import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ConversionResult } from '../../components/conversion-result/conversion-result';
import { ConversionSelector } from '../../components/conversion-selector/conversion-selector';
import { NumberInput } from '../../components/number-input/number-input';
import { ConversionType } from '../../models/conversion-type';

@Component({
  selector: 'app-converter-page',
  imports: [NgTemplateOutlet, NumberInput, ConversionResult, ConversionSelector],
  templateUrl: './converter-page.html',
  styleUrl: './converter-page.scss',
})
export class ConverterPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly selectedConversion = toSignal(
    this.route.paramMap.pipe(
      map((parameters): ConversionType => {
        const conversion = parameters.get('conversion');

        return this.isConversionType(conversion) ? conversion : 'binary-to-hex';
      }),
    ),
    {
      initialValue: 'binary-to-hex' as ConversionType,
    },
  );

  protected readonly binaryToHexValue = signal('10101110');
  protected readonly binaryToDecimalValue = signal('10101110');
  protected readonly decimalToBinaryValue = signal('174');
  protected readonly decimalToHexValue = signal('174');
  protected readonly hexToBinaryValue = signal('AE');

  protected readonly hexadecimalResult = computed(() =>
    this.convertBinaryToHexadecimal(this.binaryToHexValue()),
  );

  protected readonly decimalResult = computed(() =>
    this.convertBinaryToDecimal(this.binaryToDecimalValue()),
  );

  protected readonly binaryResult = computed(() =>
    this.convertDecimalToBinary(this.decimalToBinaryValue()),
  );

  protected readonly decimalToHexResult = computed(() =>
    this.convertDecimalToHexadecimal(this.decimalToHexValue()),
  );

  protected readonly hexToBinaryResult = computed(() =>
    this.convertHexadecimalToBinary(this.hexToBinaryValue()),
  );

  protected readonly changeConversion = (conversion: ConversionType): void => {
    void this.router.navigate(['/convert', conversion]);
  };

  protected readonly updateBinaryToHexValue = (value: string): void => {
    this.binaryToHexValue.set(value);
  };

  protected readonly updateBinaryToDecimalValue = (value: string): void => {
    this.binaryToDecimalValue.set(value);
  };

  protected readonly updateDecimalToBinaryValue = (value: string): void => {
    this.decimalToBinaryValue.set(value);
  };

  protected readonly updateDecimalToHexValue = (value: string): void => {
    this.decimalToHexValue.set(value);
  };

  protected readonly updateHexToBinaryValue = (value: string): void => {
    this.hexToBinaryValue.set(value);
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

  private convertDecimalToBinary(value: string): string {
    if (!this.isValidDecimal(value)) {
      return 'Valor inválido';
    }

    const decimalValue = Number.parseInt(value, 10);

    return decimalValue.toString(2);
  }

  private convertDecimalToHexadecimal(value: string): string {
    if (!this.isValidDecimal(value)) {
      return 'Valor inválido';
    }

    const decimalValue = Number.parseInt(value, 10);

    return decimalValue.toString(16).toUpperCase();
  }

  private convertHexadecimalToBinary(value: string): string {
    if (!this.isValidHexadecimal(value)) {
      return 'Valor inválido';
    }

    const decimalValue = Number.parseInt(value, 16);

    return decimalValue.toString(2);
  }

  private isValidBinary(value: string): boolean {
    return /^[01]+$/.test(value);
  }

  private isValidDecimal(value: string): boolean {
    return /^\d+$/.test(value);
  }

  private isValidHexadecimal(value: string): boolean {
    return /^[0-9a-fA-F]+$/.test(value);
  }

  private isConversionType(value: string | null): value is ConversionType {
    return (
      value === 'binary-to-hex' ||
      value === 'binary-to-decimal' ||
      value === 'decimal-to-binary' ||
      value === 'decimal-to-hex' ||
      value === 'hex-to-binary'
    );
  }
}
