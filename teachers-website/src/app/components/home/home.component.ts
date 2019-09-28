import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username;

  public PostIDList: any[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.username = this.userService.getStoredLoggedInUsername();

    /* Get All Post IDs the User currently has and display as table */
    this.userService.getUserPostIDs().then((response) => {
      console.log('Response Retrieved Post ID List: ', response);
      this.PostIDList = response.content;
    });
  }
}
