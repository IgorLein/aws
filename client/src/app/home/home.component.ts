import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { finalize } from 'rxjs/operators';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

import { QuoteService } from './quote.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  uploadedImageSrc = '';
  isLoggedIn = false;
  cognitoUser: any = null;
  currentUserName = '';

  constructor(private quoteService: QuoteService, private http: Http) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
    this.initCurrentCognitoUser();
    this.checkIsLoggedIn();
  }

  initCurrentCognitoUser() {
    const data = {
      UserPoolId: environment.cognitoConfig.userPoolId,
      ClientId: environment.cognitoConfig.clientId
    };
    const userPool = new CognitoUserPool(data);
    this.cognitoUser = userPool.getCurrentUser();
  }

  checkIsLoggedIn() {
    if (!this.cognitoUser) {
      return;
    }

    this.cognitoUser.getSession((err: any, session: any) => {
      if (err) {
        console.log('getSession error');
        alert(err);
        return;
      }
      console.log('user is logged in');
      this.isLoggedIn = session.isValid();
    });

    this.cognitoUser.getUserAttributes((err: any, result: any) => {
      if (err) {
        console.log('getUserAttributes error');
        alert(err);
        return;
      }
      const attribute = result.find((a: any) => a.Name === 'name');
      if (!attribute) {
        return;
      }

      this.currentUserName = attribute.Value;
    });
  }

  handleSignOut(e: any) {
    e.preventDefault();
    if (!this.cognitoUser) {
      return;
    }

    this.cognitoUser.signOut();
    window.location.replace('/');
  }

  handleFileInput(files: FileList) {
    const fileToUpload = files.item(0);
    const endpoint = `${environment.serverUrl}/upload`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData).subscribe(res => {
      const { data } = res.json();
      this.uploadedImageSrc = data.Location;
    });
  }
}
