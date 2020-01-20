import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userdata => resolve(userdata),
          err => reject(err));
    });
  }
  getAuth() {
    return this.angAuth.authState.pipe(map(auth => auth));
  }
  logOut() {
    this.angAuth.auth.signOut();
  }
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userdata => resolve(userdata),
          err => reject(err));
    });
  }
}
