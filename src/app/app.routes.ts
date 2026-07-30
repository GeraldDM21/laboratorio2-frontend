import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { CategoriasComponent } from './pages/categorias/categorias';
import { CategoriaFormComponent } from './pages/categoria-form/categoria-form';
import { ProductosComponent } from './pages/productos/productos';
import { ProductoFormComponent } from './pages/producto-form/producto-form';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'categorias', component: CategoriasComponent, canActivate: [authGuard] },
  { path: 'categorias/form', component: CategoriaFormComponent, canActivate: [authGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [authGuard] },
  { path: 'productos/form', component: ProductoFormComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard, adminGuard] }
];
