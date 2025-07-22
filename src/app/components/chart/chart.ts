import { Component, Input }       from '@angular/core';
import { CommonModule }           from '@angular/common';
import { BaseChartDirective }     from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-chart',
  imports: [ CommonModule , BaseChartDirective ],
  templateUrl: './chart.html',
  styleUrl: './chart.css'
})
export class Chart {
  @Input() type: ChartType = 'line';

  @Input() data!: ChartData<'line' | 'bar'>;

  @Input() options: ChartOptions = {};

  @Input() height = 300;
}
