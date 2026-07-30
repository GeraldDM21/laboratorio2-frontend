import { Component, OnInit } from '@angular/core';
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
  currentPage = 0;
  error = '';

  constructor(
    private categoriaService: CategoriaService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(page: number = 0): void {
    this.categoriaService.getAll(page).subscribe({
      next: (res) => {
        this.categorias = res.content;
        this.totalPages = res.totalPages;
        this.currentPage = res.number;
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
