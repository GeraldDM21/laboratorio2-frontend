import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Categorias } from './pages/categorias/categorias';
import { CategoriaForm } from './pages/categoria-form/categoria-form';
import { Productos } from './pages/productos/productos';
import { ProductoForm } from './pages/producto-form/producto-form';
import { Usuarios } from './pages/usuarios/usuarios';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'categorias', component: Categorias, canActivate: [authGuard] },
  { path: 'categorias/new', component: CategoriaForm, canActivate: [authGuard] },
  { path: 'categorias/edit/:id', component: CategoriaForm, canActivate: [authGuard] },
  { path: 'productos', component: Productos, canActivate: [authGuard] },
  { path: 'productos/new', component: ProductoForm, canActivate: [authGuard] },
  { path: 'productos/edit/:id', component: ProductoForm, canActivate: [authGuard] },
  { path: 'usuarios', component: Usuarios, canActivate: [authGuard, adminGuard] },
];
