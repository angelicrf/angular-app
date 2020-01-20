import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(private autService: AuthService,
              private flashmessage: FlashMessagesService,
              private router: Router) { }
  ngOnInit() {

}

 onSubmit() {
    this.autService.register(this.email, this.password)
      .then(res => {
        this.flashmessage.show('You are now registered and Loggedin!',{
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.router.navigate(['/']);
      }).catch(err => {
        this.flashmessage.show(err, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
    });
 }
}
