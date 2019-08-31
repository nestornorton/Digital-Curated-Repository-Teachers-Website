import {Component, OnInit} from '@angular/core';
import {Credentials} from '../../DomainModels/credentials';
import {UserService} from '../../services/user-service';
import {AuthRegistrationResponse} from '../../DomainModels/serverAuthRegistrationResponse';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /* Login Success property: true/false - if it is true, a login Success pop up is shown */
  public loginSuccess = false;

  /* Login Failure property: true/false - iftrue, then there is an error either in the login form or invalid credentials */
  public loginFailure = false;
  public loginFailureMessage = '';

  /* Credentials Object properties binded by ngModel in view */
  public credentials: Credentials = {
    username: '',
    password: ''
  };

  /* tell Angular Inject userService singleton into this class as dependency and Router service */
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  /** Method that utilizes userService to make authenticate API call and wait for asynchronous completion of request
   * if user is not found in the db, it will return -> res.json({success: false, msg: 'User not found'})
   * @see users.js in directory: Digital-Curated-Repository-Website/routes **/
  public login() {
    this.userService.authenticate(this.credentials).then((response) => {
        const res: AuthRegistrationResponse = response;
        console.log('response received: ', response);

        if (res.success === true) {
          this.loginFailure = false;
          this.loginSuccess = true;

          /* Store the username in the angular service for later usage */
          this.userService.storeLoggedInUsername(this.credentials.username);

          /* navigate to Home Page on successful registration, delay by one sec and half */
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 1500);
        } else {
          this.loginFailure = true;
          this.loginFailureMessage = 'Invalid Credentials';
        }
      }
    );
  }

}
