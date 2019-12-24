import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loading=false;
  action:'login' | 'signup' = 'login';
  userFound;
  constructor(private afAuth: AngularFireAuth, private router: Router) {}


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
       this.userFound=resp.user.email;


       form.reset();
     }
     else{
       resp = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
     }
      const uid = resp.user.uid;
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
