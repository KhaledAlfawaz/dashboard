import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable, map } from 'rxjs';


export interface SalesPoint {
  date:  string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {
    constructor(private http: HttpClient) {}

  getMonthlySales(): Observable<SalesPoint[]> {
    return this.http.get<SalesPoint[]>('/assets/chart.json');
  }
}
