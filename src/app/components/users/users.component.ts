import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/User';
import {NgForm} from '@angular/forms';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    age: null,
    address: {
      street: '',
      city: '',
      state: ''
    }

  };
  users: User[];
  shpwExtended = false;
  loaded = false;
  enableAdd = true;
  showUseForm = false;
  currentClasses = {};
  currentStyles = {};
  data: any;
  @ViewChild('userForm', {static: true}) form: NgForm;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      console.log('The data is:', data);
    });
    setTimeout(() => {
    this.dataService.getUsers().subscribe(user => {
      this.users = user;
      this.loaded = true;
    });

    this.shpwExtended = true;
    this.setCurrentClasses();
    this.setCurrentStyles();
    }, 2000);

  }
  addUser() {
    this.user.isActive = true;
    this.user.registered = new Date();
    this.users.push(this.user);
    // document.querySelector('form').reset();

    this.user = {
      firstName: 'sent',
      lastName: 'sent',
      age: null,
      address: {
        street: '',
        city: '',
        state: ''
      }
    };
  }
  setCurrentClasses() {
    this.currentClasses = {
      'btn-success': this.enableAdd,
      'big-text': this.shpwExtended
    };
  }
  setCurrentStyles() {
    this.currentStyles = {
      'padding-top': this.shpwExtended ? '0' : '60px',
      'font-size': this.shpwExtended ? '' : '40px'
    };
  }
  fireEvent(e) {
    console.log('the button is clicked.', e.target.value);
  }
  toggleHide(user: User) {
    user.hide = !user.hide;
  }
  onSubmit(e) {
    // {value , valid}: {value: User, valid: boolean}) {
    console.log(e.target.value);
    e.preventDefault();
    /*if (!valid) {
     console.log('the form is not valid');
    } else {
     value.isActive = true;
     value.registered = new Date();
     value.hide = true;
     this.shpwExtended = true;
     value.firstName = (document.getElementById('first')as HTMLTextAreaElement).value;
     value.lastName = (document.getElementById('last')as HTMLTextAreaElement).value;
     this.users.unshift(value);
    // this.form.reset();
    }*/
  }
}
