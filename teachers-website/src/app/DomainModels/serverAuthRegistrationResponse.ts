/* JSON Model returned back from the backend for Login/Registration request/response
* Use the optional properties below by casting response of type any to an object of this interface type and using
* properties needed */
export interface AuthRegistrationResponse {
  success?: boolean; // ? is optional
  msg?: string;
  user?: any;
  token?: any;
}
