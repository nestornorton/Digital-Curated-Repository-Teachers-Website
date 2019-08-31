import {Component, OnInit} from '@angular/core';
import {Registration} from '../../DomainModels/registration';
import {UserService} from '../../services/user-service';
import {AuthRegistrationResponse} from '../../DomainModels/serverAuthRegistrationResponse';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /* Register Success property: if true, a Register Success pop up is shown */
  public registerSuccess = false;

  /* Login Failure property: true/false - if true, then there is an error in registration form  */
  public registerFailure = false;
  public registrationFailureMessage = '';

  /* Registration Object properties binded by ngModel in view */
  public registrationInfo: Registration = {
    name: '',
    email: '',
    username: '',
    password: ''
  };

  /* confirm pass property for checking if passwords match */
  confirmPass: any;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  public onRegister() {
    /* if pass and confirm Pass match*/
    if (this.registrationInfo.password.localeCompare(this.confirmPass) === 0) {
      this.userService.register(this.registrationInfo).then((response) => {
        const resObj: AuthRegistrationResponse = response;

        console.log('response received: ', response);
        if (resObj.success === true) {
          this.registerFailure = false;
          this.registerSuccess = true;

          /* Store the username in the angular service for later usage */
          this.userService.storeLoggedInUsername(this.registrationInfo.username);

          /* navigate to Home Page on successful registration, delay by one sec and half */
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 1500);
        } else {
          this.registerFailure = true;
          this.registrationFailureMessage = resObj.msg;
        }
      });
    } else {
      this.registerFailure = true;
      this.registrationFailureMessage = 'Password and Confirm Password don\'t match';
    }

  }
}
