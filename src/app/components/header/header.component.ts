import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeRates } from '../../models/interfaces';
import { ExchangeRateService } from '../../services/exchange-rate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent implements OnInit {
  exchangeRates: ExchangeRates = { USD: 0, EUR: 0, UAH: 1 };

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates(): void {
    this.exchangeRateService.getExchangeRates().subscribe({
      next: (data) => {
        const eurToUah = data.rates.UAH; // Курс EUR до UAH
        const usdToUah = data.rates.UAH / data.rates.USD; // Переводимо курс USD до UAH через EUR

        this.exchangeRates['USD'] = usdToUah;
        this.exchangeRates['EUR'] = eurToUah;
      },
      error: (error) => {
        console.error('API Error:', error);
      },
    });
  }
}
