import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { ProductoService } from '../../services/producto';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-productos',
  imports: [NgIf, NgFor, CurrencyPipe, RouterLink],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class Productos implements OnInit {
  productos: any[] = [];
  totalPages = 0;
  currentPage = 0;
  error = '';

  constructor(
    private productoService: ProductoService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(page: number = 0): void {
    this.productoService.getAll(page).subscribe({
      next: (res) => {
        this.productos = res.content;
        this.totalPages = res.totalPages;
        this.currentPage = res.number;
      },
      error: () => { this.error = 'Error al cargar productos'; }
    });
  }

  delete(id: number): void {
    if (confirm('¿Eliminar este producto?')) {
      this.productoService.delete(id).subscribe({
        next: () => this.loadProductos(this.currentPage),
        error: () => { this.error = 'Error al eliminar'; }
      });
    }
  }
}
