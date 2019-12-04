import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public username;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['/Login']);
    } else {
      this.username = this.userService.getStoredLoggedInUsername();
    }
     

  }

}
