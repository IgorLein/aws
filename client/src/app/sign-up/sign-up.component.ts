import { Component } from '@angular/core';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  email = '';
  name = '';
  phone = '';
  password = '';
  passwordConfirmation = '';

  handleUserCreate() {
    if (this.password !== this.passwordConfirmation) {
      alert('Please confirm the password!');
      return;
    }

    const poolData = {
      UserPoolId : environment.cognitoConfig.userPoolId,
      ClientId : environment.cognitoConfig.clientId
    };
    const userPool = new CognitoUserPool(poolData);

    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: this.email
    };
    const dataPersonalName = {
      Name: 'name',
      Value: this.name
    };
    const dataPhoneNumber = {
      Name: 'phone_number',
      Value: this.phone
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributePersonalName = new CognitoUserAttribute(dataPersonalName);
    const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    attributeList.push(attributePersonalName);
    attributeList.push(attributePhoneNumber);

    userPool.signUp(this.email, this.password, attributeList, null, function(err: any, result: any){
        if (err) {
            alert(err);
            return;
        }
        window.location.replace('/');
    });
  }
}
