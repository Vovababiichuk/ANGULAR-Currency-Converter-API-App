import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, CurrencyConverterComponent]
})
export class AppComponent {}
