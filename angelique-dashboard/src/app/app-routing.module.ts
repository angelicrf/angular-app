import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {AngularFireAuthGuard, redirectUnauthorizedTo, customClaims} from "@angular/fire/auth-guard";
import {map} from "rxjs/operators";
import {UsersComponent} from "./users/users.component";
import {pipe} from "rxjs";


const redearectToUnauthorizedtoLogin = () => redirectUnauthorizedTo(['']);

const redearectLoggedInToProfile = () => map(userFound => userFound ? ['profile', (userFound as any).uid]: true);

const adminOnly = () => pipe(
  customClaims,
  map(claims => claims.admin === true || [''])
);
const redirectLoggiedInProfileOrUsers = () =>
  pipe(
    customClaims,
    map(claims => {
      if (claims.length === 0){
        return true;
      }
      if (claims.admin){
        return ['users'];
      }
      return ['profile', claims.user_id];

      })
  );
const allAdminOnly = (next) =>
  pipe(
    customClaims,
    map(claims => {
      if(claims.length == 0){
        return ['']
      }
    return next.params.id == claims.user_id || claims.admin;
    })
  );
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data:{authGuardPipe: redirectLoggiedInProfileOrUsers}
  },
  {
    path:'profile/:id',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data:{authGuardPipe: allAdminOnly}
  },
  {
    path:'users',
    component: UsersComponent,
    canActivate: [AngularFireAuthGuard],
    data:{authGuardPipe: adminOnly}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
