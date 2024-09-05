import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExchangeRates } from '../../models/interfaces';
import { ExchangeRateService } from '../../services/exchange-rate.service';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: [],
})
export class CurrencyConverterComponent implements OnInit {
  amount1: number = 0;
  amount2: number = 0;
  currency1: string = 'UAH';
  currency2: string = 'USD';
  rates: ExchangeRates = { UAH: 1, USD: 0, EUR: 0 };

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates(): void {
    this.exchangeRateService.getExchangeRates().subscribe({
      next: (data) => {
        this.rates['USD'] = data.rates.UAH / data.rates.USD;
        this.rates['EUR'] = data.rates.UAH;
        this.updateConversion();
      },
      error: (error) => {
        console.error('API Error:', error);
      },
    });
  }

  updateConversion(): void {
    const rate1 = this.rates[this.currency1];
    const rate2 = this.rates[this.currency2];

    if (rate1 && rate2) {
      this.amount2 = (this.amount1 * rate1) / rate2;
    }
  }

  handleAmountChange(value: number, isAmount1: boolean): void {
    if (isAmount1) {
      this.amount1 = value;
      this.updateConversion();
    } else {
      this.amount2 = value;
      const rate1 = this.rates[this.currency1];
      const rate2 = this.rates[this.currency2];
      this.amount1 = (this.amount2 * rate2) / rate1;
    }
  }

  handleCurrencyChange(currency: string, isCurrency1: boolean): void {
    if (isCurrency1) {
      this.currency1 = currency;
    } else {
      this.currency2 = currency;
    }
    this.updateConversion();
  }
}
