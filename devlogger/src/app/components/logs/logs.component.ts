import { Component, OnInit } from '@angular/core';
import {Logs} from '../../models/Logs';
import {LogService} from '../../services/log.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Logs[];
  selectedLog: Logs;
  loaded = false;

  constructor(private lg: LogService) { }

  ngOnInit() {
    this.lg.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedLog = {
          id: '',
          text: '',
          date: ''
        };
      }
    });
    this.lg.getLogs().subscribe(log => {
      this.logs = log;
      this.loaded = true;
    });
  }
  onSelect(log: Logs) {
    this.lg.setFormLog(log);
    this.selectedLog = log;
  }
  onDelete(log: Logs){
    if (confirm('Are you sure to delete? ')){
      this.lg.deleteLog(log);
    }
  }

}
