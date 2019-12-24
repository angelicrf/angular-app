import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {UserProfile} from "../core/user-profile.model";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {error} from "util";
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private itemDoc:AngularFirestoreDocument<UserProfile>;
  item:Observable<UserProfile>;
  uid: string;
  loading = false;
  error: string;

  constructor(
    private auth: AuthService,
    public ofAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private route: ActivatedRoute) {
    this.uid = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {

    this.itemDoc = this.afs.doc<UserProfile>(`users/${this.uid}`);
    this.item = this.itemDoc.valueChanges();
  }
 async onSubmit(ngForm:NgForm){
    this.loading = true;
    const {
      email,
      name,
      address,
      city,
      state,
      zip,
      ip,
      phone,
      specialty
    } = ngForm.form.getRawValue();
    const userProfile: UserProfile = {
      uid: this.uid,
      email,
      name,
      address,
      city,
      state,
      zip,
      ip,
      phone,
      specialty
    };
    try{
      await this.auth.updateUserDocument(userProfile);

    }catch (e) {
      console.log(e.message);
      this.error = e.message;
    }
    this.loading = false;
 }
}
