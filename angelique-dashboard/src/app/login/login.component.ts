import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading=false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
  }

  async onSubmit(form: NgForm){

    this.loading =true;
    let {email, password, firstName, lastName} = form.value;
    console.log("Form values are:", form.value);




    try{
     // form.form.reset();
      const resp = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log("the response is: ", resp);
      await resp.user.updateProfile({displayName :`${firstName} ${lastName}`});

      const uid = resp.user.uid;
     //form.resetForm(userDefault());

      form.form.reset();
      this.router.navigate([`/profile/${uid}`]);

    }catch (e) {
      console.log(e.message);
    }
    this.loading=false;
  }
}
