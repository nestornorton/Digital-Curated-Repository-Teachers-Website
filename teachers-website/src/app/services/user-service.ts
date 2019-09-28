import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Credentials} from '../DomainModels/credentials';

@Injectable({
  providedIn: 'root'
})
/* Angular Service for Users -  Stores user information accessible by any component and  Login, Register and Profile API
Requests to the backend */
export class UserService {

  /* Property to store username in after user logs in */
  private loggedInUsername: string;

  /* URL Endpoint to connect to the backend */
  private readonly endpoint = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  /* Store the logged in username in this service for later usage */
  public async storeLoggedInUsername(username: any) {
    this.loggedInUsername = username;
    console.log('saved userID: ', this.loggedInUsername);
  }

  /* Retrieve the username of user that is logged in */
  public getStoredLoggedInUsername() {
    return this.loggedInUsername;
  }

  /* Sends an authentication request with user credentials to the backend */
  public authenticate(credentials: Credentials): Promise<any> {
    return this.http.post(this.endpoint.concat('/authenticate'), credentials, {}).toPromise();
  }

  /* Sends a registration request with user registration information to the backend */
  public register(registrationInfo: any): Promise<any> {
    return this.http.post(this.endpoint.concat('/register'), registrationInfo, {}).toPromise();
  }

  /* Stores a Post's Object ID in the User's content[] array
  * request body must contain objectID of the Post and unique username */
  public storePostID(postObjID: any): Promise<any> {
    const body = {
      userID: this.getStoredLoggedInUsername(),
      ObjID: postObjID
    };
    console.log('sending request to store PostObjID', body);
    return this.http.post(this.endpoint.concat('/storePostID'), body, {}).toPromise();
  }

  /* Retrieve the list of Posts Object IDs
* request must contain unique username of user
* GET request contains username as query parameter in URL (syntax ':' to denote query param) */
  public getUserPostIDs(): Promise<any> {
    return this.http.post(this.endpoint.concat('//getPostIDs?userID='.concat(this.getStoredLoggedInUsername())),
      {}, {}).toPromise();
  }
}
