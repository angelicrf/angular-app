import {Component, Injectable, OnInit} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {map} from 'rxjs/operators';
import {SettingsService} from '../services/settings.service';
import {Observable} from 'rxjs';

@Injectable()
export class RegisterGuard implements CanActivate {


  constructor(private router: Router,
              private settingService: SettingsService) {}

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.settingService.getSetting().allowRegistration) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
