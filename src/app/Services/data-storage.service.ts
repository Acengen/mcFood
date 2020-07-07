import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { Product } from '../Models/product.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  //

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }
}
