import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {UserProfile} from "./user-profile.model";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private anAuth: AngularFireAuth, private afs: AngularFirestore) { }

  logout(){
    this.anAuth.auth.signOut();
    this.router.navigate(['']);

  }
  isLoggedIn(){
    return !!this.anAuth.auth.currentUser;
  }
  createUserDocument(){
    const user = this.anAuth.auth.currentUser;
    const userProfile: UserProfile={
      uid: user.uid,
      email: user.email,
      name:user.displayName,
      address: '',
      city:'',
      state:'',
      zip:'',
      phone:'',
      specialty:'',
      ip:''
    };
    return this.afs.doc(`users/${user.uid}`).set(userProfile);
  }
  updateUserDocument(useProfile:UserProfile){
    return this.afs.doc(`users/${useProfile.uid}`).update(useProfile);
  }
}
