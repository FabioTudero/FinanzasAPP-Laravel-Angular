import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); 

@Component({
  selector: 'app-grafic',
  standalone: true,
  imports: [],
  templateUrl: './grafic.component.html',
  styleUrl: './grafic.component.css'
})
export class GraficComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  
// Datos de ingresos y gastos por categoría
labels = ['Salario', 'Freelance', 'Inversión', 'Alquiler', 'Compras', 'Ocio', 'Comida'];
dataValues = [1500, 700, 500, -400, -600, -300, -500]; // Positivos: Ingresos | Negativos: Gastos

ngAfterViewInit(): void {
  // Colores para ingresos y gastos
  const incomeColor = 'rgba(54, 162, 235, 0.6)'; // Azul para ingresos
  const expenseColor = 'rgba(255, 99, 132, 0.6)'; // Rojo para gastos

  // Asignar colores dinámicamente
  const backgroundColors = this.dataValues.map(value => value > 0 ? incomeColor : expenseColor);
  const borderColors = this.dataValues.map(value => value > 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)');

  new Chart(this.chartCanvas.nativeElement, {
    type: 'doughnut', // O usa 'pie' si prefieres
    data: {
      labels: this.labels,
      datasets: [{
        label: 'Ingresos y Gastos',
        data: this.dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
}