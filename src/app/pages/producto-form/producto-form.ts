import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ProductoService } from '../../services/producto';
import { CategoriaService } from '../../services/categoria';

@Component({
  selector: 'app-producto-form',
  imports: [FormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.scss'
})
export class ProductoForm implements OnInit {
  producto = { nombre: '', descripcion: '', precio: 0, cantidadStock: 0, categoria: { id: null as number | null } };
  categorias: any[] = [];
  id: number | null = null;
  isEdit = false;
  error = '';

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.productoService.getById(this.id).subscribe({
        next: (res) => {
          this.producto = {
            nombre: res.data.nombre,
            descripcion: res.data.descripcion,
            precio: res.data.precio,
            cantidadStock: res.data.cantidadStock,
            categoria: { id: res.data.categoria?.id ?? null }
          };
        },
        error: () => { this.error = 'Error al cargar producto'; }
      });
    }
  }

  loadCategorias(): void {
    this.categoriaService.getAll(1, 100).subscribe({
      next: (res) => { this.categorias = res.data; },
      error: () => { this.error = 'Error al cargar categorías'; }
    });
  }

  onSubmit(): void {
    if (this.isEdit && this.id) {
      this.productoService.update(this.id, this.producto).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: () => { this.error = 'Error al actualizar'; }
      });
    } else {
      this.productoService.create(this.producto).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: () => { this.error = 'Error al crear'; }
      });
    }
  }
}
