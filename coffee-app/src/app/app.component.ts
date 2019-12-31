import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'coffee-app';
  constructor(private snackBar: MatSnackBar) {

  }
  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    if ((navigator as any).standalone == false) {
      this.snackBar.open('You can add pwa to the home screen', '', {duration: 3000});
    }
    // tslint:disable-next-line:triple-equals
    /*if ((navigator as any).standalone == undefined) {

      if (window.matchMedia('(display-mode: browser').matches) {
      window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        const sb = this.snackBar.open('Do you want to install this app?', 'install', {duration: 500});
        sb.onAction().subscribe( () => {
          (event as any).prompt();
         /!* (event as any).userChoice.then( result => {
            // tslint:disable-next-line:triple-equals
            if (result.outcome == 'dismissed') {

            } else {

            }
          });*!/
        });

        return false;
    });
    }
    }*/
  }
}
