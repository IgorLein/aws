import { Component } from '@angular/core';
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  email = '';
  password = '';

  handleUserSignIn() {
    const authenticationData = {
      Username: this.email,
      Password: this.password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
      UserPoolId: environment.cognitoConfig.userPoolId,
      ClientId: environment.cognitoConfig.clientId
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: this.email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result: any) {
        window.location.replace('/');
      },
      onFailure: function(err: any) {
        alert(err);
      }
    });
  }
}
