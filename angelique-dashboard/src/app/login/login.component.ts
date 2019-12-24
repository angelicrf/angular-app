import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../core/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loading=false;
  action:'login' | 'signup' = 'login';
  public name;
  constructor(private afAuth: AngularFireAuth, private router: Router, private auth: AuthService) {}


  ngOnInit() {
  }

  async onSubmit(form: NgForm){

    this.loading =true;
    let {email, password, firstName, lastName} = form.value;
    console.log("Form values are:", form.value);

    let resp;
    try{

     if(this.isSignUp){
       resp = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log("the response is: ", resp);
      await resp.user.updateProfile({displayName :`${firstName} ${lastName}`});
       await this.auth.createUserDocument();

       form.reset();
     }
     else{
       resp = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
     }
      const uid = resp.user.uid;
     this.name = resp.user.uid;
      //form.resetForm(userDefault());
      this.router.navigate([`/profile/${uid}`]);
    }catch (e) {
      console.log(e.message);
    }
    this.loading=false;
  }
  get isLogin(){
    return this.action === 'login';
  }
  get isSignUp(){
    return this.action === 'signup';
  }
}
