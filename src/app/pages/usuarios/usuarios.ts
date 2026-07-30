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
  currentPage = 0;
  error = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(page: number = 0): void {
    this.usuarioService.getAll(page).subscribe({
      next: (res) => {
        this.usuarios = res.content;
        this.totalPages = res.totalPages;
        this.currentPage = res.number;
      },
      error: () => { this.error = 'Error al cargar usuarios'; }
    });
  }
}
