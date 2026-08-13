import { Component, input } from '@angular/core';

@Component({
  selector: 'app-conversion-result',
  imports: [],
  templateUrl: './conversion-result.html',
  styleUrl: './conversion-result.scss',
})
export class ConversionResult {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
}