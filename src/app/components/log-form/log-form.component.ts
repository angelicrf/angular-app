import { Component, OnInit } from '@angular/core';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;
  isNew = true;
  constructor(private lgs: LogService) { }

  ngOnInit() {
    this.lgs.selectedLog.subscribe(log => {
     if (log.id !== null) {
       this.isNew = false;
       this.id = log.id;
       this.text = log.text;
       this.date = log.date;
     }
    });
  }
  onsubmit() {
   if (this.isNew) {
     const NewLog = {
       id: this.generateId(),
       text: this.text,
       date: new Date()
     };
     this.lgs.addLog(NewLog);
   } else {
     const updateLog = {
       id: this.id,
       text: this.text,
       date: new Date()
     };
     this.lgs.updateLog(updateLog);
   }
   this.clearState();
  }
  generateId() {
    // tslint:disable-next-line:only-arrow-functions
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:triple-equals no-bitwise one-variable-per-declaration prefer-const
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this.lgs.clearState();
  }
}
