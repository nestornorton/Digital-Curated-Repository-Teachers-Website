import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  loggedInOptsFlag = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  public onComponentActivate($event) {
    console.log('checking if user is logged in to enable nav bar user opts');
    if (this.userService.isLoggedIn) {
      this.loggedInOptsFlag = true;
    }
  }
}

