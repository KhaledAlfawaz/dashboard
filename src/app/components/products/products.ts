import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Product , ProductService } from '../../services/product-service';
import { ProductCard }    from '../product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule , ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  products: Product[] = [];

  constructor(private svc: ProductService) {}

  ngOnInit() {
    this.svc.getProducts()
      .subscribe(data => this.products = data);
  }

  toggleFavorite(p: Product) {
    p.isFavorite = !p.isFavorite;
  }
}
