import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';

// Registra los componentes necesarios de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-grafic',
  standalone: true,
  templateUrl: './grafic.component.html',
})
export class GraficComponent implements OnChanges, AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef<HTMLCanvasElement>;
  @Input() balance: { INCOME: number; EXPENSE: number } | undefined;

  public chart!: Chart;
  income = 0;
  expense = 0;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['balance'] && this.balance) {
      this.income = this.balance.INCOME || 0;
      this.expense = Number(this.balance.EXPENSE) || 0;

      if (this.chart) {
        this.updateChart();
      }
    }
  }

  private createChart(): void {
    if (!this.chartRef?.nativeElement) {
      console.error('Canvas element is not available.');
      return;
    }

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context from canvas element.');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'pie' as ChartType,
      data: {
        labels: ['Ingresos', 'Gastos'],
        datasets: [{
          label: 'Ingresos y Gastos',
          data: [this.income, this.expense],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ]
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Ingresos y Gastos',
          },
        },
      },
    });
  }

  private updateChart(): void {
    if (!this.chart) return;

    this.chart.data.datasets[0].data = [this.income, this.expense];
    this.chart.update();
  }
}