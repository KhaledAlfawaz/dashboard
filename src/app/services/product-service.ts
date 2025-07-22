import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  isFavorite: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<ApiProduct[]>(this.url).pipe(
      map(raw =>
        raw.map(p => ({
          id: p.id,
          imageUrl: p.image,
          name:     p.title,
          price:    `$${p.price.toFixed(2)}`,
          rating:   Math.round(p.rating.rate),
          reviews:  p.rating.count,
          isFavorite: false
        }))
      )
    );
  }
}
