import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {UserProfile} from "../core/user-profile.model";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {error} from "util";
import {AuthService} from "../core/auth.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

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
  doawnloadURL: Observable<string>;
  uploadProgress: Observable<number>;

  constructor(
    private auth: AuthService,
    public ofAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private afStorage: AngularFireStorage


    ) {
    this.uid = this.route.snapshot.paramMap.get('id');
    this.doawnloadURL = this.afStorage.ref(`users/${this.uid}/profile-image`)
      .getDownloadURL();

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
  fileChange(event){
    this.doawnloadURL = null;
    this.error = null;

    const file = event.target.files[0];
    const filePath = `users/${this.uid}/profile-image`;
    const filref = this.afStorage.ref(filePath);

    const task = this.afStorage.upload(filePath,file);
    task.catch(error => this.error = error.message);
    this.uploadProgress = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(
          () => {
            this.doawnloadURL = filref.getDownloadURL();
          })
      )
      .subscribe();

  }
}
