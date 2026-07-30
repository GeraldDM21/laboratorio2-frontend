import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  currentPage = 1;
  error = '';

  constructor(
    private productoService: ProductoService,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(page: number = 1): void {
    this.productoService.getAll(page).subscribe({
      next: (res) => {
        this.productos = res.data ?? [];
        this.totalPages = res.meta?.totalPages ?? 0;
        this.currentPage = res.meta?.pageNumber ?? 1;
        this.cdr.detectChanges();
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
