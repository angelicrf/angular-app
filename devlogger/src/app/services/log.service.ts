import { Injectable } from '@angular/core';
import {BehaviorSubject , Observable, of} from 'rxjs';

import {Logs} from '../models/Logs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Logs[];
  private logSource = new BehaviorSubject<Logs>({
    id: null, date: null, text: null
  });
  selectedLog = this.logSource.asObservable();
  // tslint:disable-next-line:ban-types
  private stateSource = new BehaviorSubject<Boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
  /*  this.logs = [
      {
        id: '1',
        text: 'Generated Commponents',
        date: new Date('01/16/2020 11:37:50')
      },
      {
        id: '2',
        text: 'Added Bootstarp',
        date: new Date('01/15/2020 12:47:56')
      },
      {
        id: '3',
        text: 'Added Logs',
        date: new Date('01/16/2020 13:27:40')
      }

    ];*/
  this.logs = [];
  }
   getLogs(): Observable<Logs[]> {
    if (localStorage.getItem('logs') === null){
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
   }
   setFormLog(log: Logs) {
    this.logSource.next(log);
   }
  addLog(log: Logs) {
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  updateLog(log: Logs) {
    this.logs.forEach((cur, index) => {
      // tslint:disable-next-line:triple-equals
      if (log.id == cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  deleteLog(log: Logs) {
    this.logs.forEach((cur, index) => {
      // tslint:disable-next-line:triple-equals
      if (log.id == cur.id) {
        this.logs.splice(index, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  clearState() {
    this.stateSource.next(true);
  }
}

