import { Component } from '@angular/core';
import { ConverterPage } from './conversion/pages/converter-page/converter-page';

@Component({
  selector: 'app-root',
  imports: [ConverterPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}