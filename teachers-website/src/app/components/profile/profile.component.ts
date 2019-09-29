import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public username;
  constructor(private userService: UserService ) { }

  ngOnInit() {
    this.username = this.userService.getStoredLoggedInUsername();
  }
  

}
