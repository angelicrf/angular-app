import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authPromise: AuthService,
              private flashmessage: FlashMessagesService,
              private router: Router) {
  }

  ngOnInit() {
    this.authPromise.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authPromise.login(this.email, this.password)
      .then(res => {
        this.flashmessage.show('the client is logged in!',
          {
            cssClass: 'alert-success',
            timeout: 4000
          });
        this.router.navigate(['/']);
      }).catch(err => {
        console.log('the error is:', err);
        this.flashmessage.show(err,
          {
            cssClass: 'alert-danger',
            timeout: 4000
          });
    });



  }


}
