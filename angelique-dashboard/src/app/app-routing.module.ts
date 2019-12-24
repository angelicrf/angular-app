import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {map} from "rxjs/operators";


const redearectToUnauthorizedtoLogin = () => redirectUnauthorizedTo(['']);

const redearectLoggedInToProfile = () => map(userFound => userFound ? ['profile', (userFound as any).uid]: true);



const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data:{authGuardPipe: redearectLoggedInToProfile}
  },
  {
    path:'profile/:id',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data:{authGuardPipe: redearectToUnauthorizedtoLogin}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
