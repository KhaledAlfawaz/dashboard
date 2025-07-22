import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deal } from '../components/deals/deals';

@Injectable({ providedIn: 'root' })
export class DealsService {
  constructor(private http: HttpClient) {}

  getDeals(): Observable<Deal[]> {
    return this.http.get<Deal[]>('/assets/deals.json');
  }
}