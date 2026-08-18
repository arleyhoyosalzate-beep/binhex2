import { Routes } from '@angular/router';
import { ConverterPage } from './conversion/pages/converter-page/converter-page';

export const routes: Routes = [
  {
    path: 'convert/:conversion',
    component: ConverterPage,
  },
  {
    path: '',
    redirectTo: 'convert/binary-to-hex',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'convert/binary-to-hex',
  },
];