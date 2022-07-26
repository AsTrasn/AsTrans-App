import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CheckLoginGuard } from "./shared/guards/check-login.guard";

const ROUTES: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'notFound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { 
    path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate:[CheckLoginGuard]
  },
  {
    path: '**', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule{}