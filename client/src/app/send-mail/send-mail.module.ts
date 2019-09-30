import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { SendMailRoutingModule } from './send-mail-routing.module';
import { SendMailComponent } from './send-mail.component';
import { QuoteService } from './quote.service';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, SendMailRoutingModule, HttpModule, FormsModule],
  declarations: [SendMailComponent],
  providers: [QuoteService]
})
export class SendMailModule {}
