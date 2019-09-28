import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
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
