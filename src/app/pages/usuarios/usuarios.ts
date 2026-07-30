import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-usuarios',
  imports: [NgIf, NgFor],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios implements OnInit {
  usuarios: any[] = [];
  totalPages = 0;
  currentPage = 1;
  error = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(page: number = 1): void {
    this.usuarioService.getAll(page).subscribe({
      next: (res) => {
        this.usuarios = res.data;
        this.totalPages = res.meta.totalPages;
        this.currentPage = res.meta.pageNumber;
      },
      error: () => { this.error = 'Error al cargar usuarios'; }
    });
  }
}
