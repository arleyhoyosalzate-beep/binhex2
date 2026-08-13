import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-number-input',
  imports: [],
  templateUrl: './number-input.html',
  styleUrl: './number-input.scss',
})
export class NumberInput {
  readonly label = input.required<string>();
  readonly inputId = input.required<string>();
  readonly value = input.required<string>();

  readonly valueChange = output<string>();

  protected handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.valueChange.emit(inputElement.value);
  }
}