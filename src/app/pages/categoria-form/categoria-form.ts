import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CategoriaService } from '../../services/categoria';


@Component({
  selector: 'app-categoria-form',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.scss'
})
export class CategoriaForm implements OnInit {
  categoria = { nombre: '', descripcion: '' };
  id: number | null = null;
  isEdit = false;
  error = '';

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.categoriaService.getById(this.id).subscribe({
        next: (res) => { this.categoria = res.data; },
        error: () => { this.error = 'Error al cargar categoría'; }
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.id) {
      this.categoriaService.update(this.id, this.categoria).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: () => { this.error = 'Error al actualizar'; }
      });
    } else {
      this.categoriaService.create(this.categoria).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: () => { this.error = 'Error al crear'; }
      });
    }
  }
}
