import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {style} from '@angular/animations';
import {SwPush, SwUpdate} from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'coffee-app';

  constructor(private snackBar: MatSnackBar, private ngsw: SwUpdate, private ngpush: SwPush) {

  }
  updateNetworkStatusUI() {
    if (navigator.onLine) {
      (document.querySelector('body') as any).style = '';
    } else {
      (document.querySelector('body') as any).style = 'filter: grayscale(1)';
    }
  }
  subscribeToPush() {
    Notification.requestPermission(permission => {
      // tslint:disable-next-line:triple-equals
      if (permission == 'granted') {
        this.ngpush.requestSubscription({serverPublicKey: ' '})
          .then(pushSubscription => {
            console.log('request push subscription ', pushSubscription);
          })
          .catch(err => {
            console.error(err);
          });
      }
    }).then(r => console.log(r));
  }
  ngOnInit() {
    this.ngsw.available.subscribe(() => {
       const sb = this.snackBar.open('The new version of the app is available', 'install',
         {duration: 5000});
       sb.onAction().subscribe( () => {
            this.ngsw.activateUpdate();
            location.reload();
       });
    });
    this.ngsw.checkForUpdate();
    this.updateNetworkStatusUI();
    window.addEventListener('online', this.updateNetworkStatusUI);
    window.addEventListener('offline', this.updateNetworkStatusUI);
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
