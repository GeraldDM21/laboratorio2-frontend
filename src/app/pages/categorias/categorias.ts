import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { CategoriaService } from '../../services/categoria';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-categorias',
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss'
})
export class Categorias implements OnInit {
  categorias: any[] = [];
  totalPages = 0;
  currentPage = 1;
  error = '';

  constructor(
    private categoriaService: CategoriaService,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(page: number = 1): void {
    this.categoriaService.getAll(page).subscribe({
      next: (res) => {
        this.categorias = res.data ?? [];
        this.totalPages = res.meta?.totalPages ?? 0;
        this.currentPage = res.meta?.pageNumber ?? 1;
        this.cdr.detectChanges();
      },
      error: () => { this.error = 'Error al cargar categorías'; }
    });
  }

  delete(id: number): void {
    if (confirm('¿Eliminar esta categoría?')) {
      this.categoriaService.delete(id).subscribe({
        next: () => this.loadCategorias(this.currentPage),
        error: () => { this.error = 'Error al eliminar'; }
      });
    }
  }
}
