import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading=false;
  constructor(private afAuth: AngularFireAuth) {

  }

  ngOnInit() {
  }
  async onSubmit(form: NgForm){
    this.loading =true;
    const {email, password, firstName, lastName} = form.value;
    console.log("Form values are:", form.value);

    try{
      const resp = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log("the response is: ", resp);
      await resp.user.updateProfile({displayName :`${firstName} ${lastName}`});
      form.reset();
    }catch (e) {
      console.log(e.message);
    }
    this.loading=false;
  }
}
