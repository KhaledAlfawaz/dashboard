import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Metric {
  title: string;
  value: string | number;
  icon: string;
  changePercent: string;
  changeLabel: string;
  changeDirection: 'up' | 'down';
}

@Injectable({
  providedIn: 'root'
})
export class Metrics {
  constructor(private http: HttpClient) {}

  getMetrics(): Observable<Metric[]> {
    return this.http.get<Metric[]>('/assets/metrics.json');
  }
}
