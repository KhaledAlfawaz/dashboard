import { Component } from '@angular/core';
import { Card } from '../card/card';
import { CommonModule }    from '@angular/common';
import { Chart } from '../chart/chart';
import { ChartData, ChartOptions } from 'chart.js';
import { Deal, Deals } from '../deals/deals';
import { tap } from 'rxjs/operators';
import { Metric, Metrics } from '../../services/metrics';
import { ChartService } from '../../services/chartService';
import { DealsService } from '../../services/deals-service';
@Component({
  selector: 'app-dashboard',
  imports: [Card,CommonModule , Chart , Deals],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  metrics: Metric[] = [];
  deals: Deal[] = [];
  salesData!: ChartData<'line'>;

  constructor(private metricsService: Metrics , private salesSvc: ChartService , private dealsSvc: DealsService) {}


  salesOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: '#eee' }, ticks: { maxTicksLimit: 5 } }
    },
    plugins: {
      tooltip: { mode: 'index', intersect: false },
      legend: { display: false }
    }
  };

  ngOnInit() {
    this.metricsService.getMetrics()
      .pipe(tap(data => this.metrics = data))
      .subscribe();

       const today = new Date();
    const prior = new Date();
    prior.setDate(today.getDate() - 30);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    this.salesSvc.getMonthlySales().subscribe(points => {
      this.salesData = {
        labels: points.map(p => p.date),
        datasets: [{
          data: points.map(p => p.value),
          fill: true,
          tension: 0.4,
          backgroundColor: 'rgba(47,128,237,0.1)',
          borderColor: 'rgba(47,128,237,1)',
          pointBackgroundColor: 'rgba(47,128,237,1)',
          pointBorderColor: '#fff'
        }]
      };
    });

    this.dealsSvc.getDeals().subscribe(data => this.deals = data);
  }
}
