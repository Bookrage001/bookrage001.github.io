import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LineGraphComponent } from '../components/line-graph/line-graph.component';

interface FuelPriceEntry {
  isoDate: string;
  dateLabel: string;
  price: number;
}

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    LineGraphComponent
  ]
})
export class ToolsComponent {
  fuelPriceEntries: FuelPriceEntry[] = [
    { isoDate: '2004-05', dateLabel: '2004-05', price: 105.3 },
    { isoDate: '2005-06', dateLabel: '2005-06', price: 125.7 },
    { isoDate: '2006-07', dateLabel: '2006-07', price: 121.5 },
    { isoDate: '2007-08', dateLabel: '2007-08', price: 141.0 },
    { isoDate: '2008-09', dateLabel: '2008-09', price: 131.3 },
    { isoDate: '2009-10', dateLabel: '2009-10', price: 116.4 },
    { isoDate: '2010-11', dateLabel: '2010-11', price: 136.1 },
    { isoDate: '2011-12', dateLabel: '2011-12', price: 138.2 },
    { isoDate: '2012-13', dateLabel: '2012-13', price: 137.1 },
    { isoDate: '2013-14', dateLabel: '2013-14', price: 146.6 },
    { isoDate: '2014-15', dateLabel: '2014-15', price: 126.9 },
    { isoDate: '2015-16', dateLabel: '2015-16', price: 106.0 },
    { isoDate: '2016-17', dateLabel: '2016-17', price: 109.9 },
    { isoDate: '2017-18', dateLabel: '2017-18', price: 123.1 },
    { isoDate: '2018-19', dateLabel: '2018-19', price: 137.0 },
    { isoDate: '2019-20', dateLabel: '2019-20', price: 124.8 },
    { isoDate: '2020-21', dateLabel: '2020-21', price: 111.9 },
    { isoDate: '2021-22', dateLabel: '2021-22', price: 161.5 },
    { isoDate: '2022-23', dateLabel: '2022-23', price: 187.7 },
    { isoDate: '2023-24', dateLabel: '2023-24', price: 186.3 },
    { isoDate: '2024-25', dateLabel: '2024-25', price: 167.5 },
    { isoDate: '2025-26', dateLabel: '2025-26', price: 297.8 }
  ];

  get sortedFuelPriceEntries(): FuelPriceEntry[] {
    return [...this.fuelPriceEntries].sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  }

  get fuelPriceLabels(): string[] {
    return this.sortedFuelPriceEntries.map((entry) => entry.dateLabel);
  }

  get fuelPriceValues(): number[] {
    return this.sortedFuelPriceEntries.map((entry) => entry.price);
  }

  get historicalTrendValues(): number[] {
    const values = this.fuelPriceValues;

    if (values.length < 3) {
      return [];
    }

    const trainingValues = values.slice(0, -1);
    const n = trainingValues.length;
    const xMean = (n - 1) / 2;
    const yMean = trainingValues.reduce((sum, value) => sum + value, 0) / n;

    const numerator = trainingValues.reduce((sum, value, index) => {
      return sum + (index - xMean) * (value - yMean);
    }, 0);

    const denominator = trainingValues.reduce((sum, _value, index) => {
      const delta = index - xMean;
      return sum + delta * delta;
    }, 0);

    if (denominator === 0) {
      return [];
    }

    const slope = numerator / denominator;
    const intercept = yMean - slope * xMean;

    return values.map((_value, index) => Number((intercept + slope * index).toFixed(1)));
  }

  get averageFuelPrice(): number {
    if (!this.fuelPriceEntries.length) {
      return 0;
    }

    const total = this.fuelPriceEntries.reduce((sum, entry) => sum + entry.price, 0);
    return total / this.fuelPriceEntries.length;
  }

  addFuelPrice(yearInput: HTMLInputElement, priceInput: HTMLInputElement): void {
    const yearValue = yearInput.value.trim();
    const priceValue = Number(priceInput.value);
    const isYearRange = /^\d{4}-\d{2}$/.test(yearValue);

    if (!isYearRange || Number.isNaN(priceValue) || priceValue <= 0) {
      return;
    }

    this.fuelPriceEntries = [
      ...this.fuelPriceEntries,
      {
        dateLabel: yearValue,
        isoDate: yearValue,
        price: Number(priceValue.toFixed(1))
      }
    ];

    yearInput.value = '';
    priceInput.value = '';
  }

  removeLatestPrice(): void {
    if (!this.fuelPriceEntries.length) {
      return;
    }

    this.fuelPriceEntries = this.fuelPriceEntries.slice(0, -1);
  }

  resetFuelPriceData(): void {
    this.fuelPriceEntries = [];
  }
}
