import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  public enableLoggedInOpts = false;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }


  public onProfile() {
    this.router.navigate(['/Profile']);
  }

  public onSharing() {
    this.router.navigate(['/Sharing']);
  }

  public onHome() {
    this.router.navigate(['/Home']);
  }

  public onRegister() {
    this.router.navigate(['/Register']);
  }

}
