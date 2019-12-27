import { Routes } from '@angular/router';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { FilesComponent } from './modulos/files/files.component';
import { MemberDetailComponent } from './modulos/members/member-detail/member-detail.component';
import { CRUDComponent } from './modulos/crud/crud.component';
export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent },
    { path: 'files', component: FilesComponent , canActivate: [AuthGuard]},
    { path: 'crud', component: CRUDComponent , canActivate: [AuthGuard]},
    { path: 'members/:id', component: MemberDetailComponent , canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'home' , pathMatch: 'full'},
]