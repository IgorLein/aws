import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, SignInRoutingModule, HttpModule, FormsModule],
  declarations: [SignInComponent]
})
export class SignInModule {}
