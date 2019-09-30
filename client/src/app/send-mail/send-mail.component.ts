import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  to = '';
  subject = '';
  invoiceId = '';
  amount = '';

  constructor(private quoteService: QuoteService,
    private http: Http) {}

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
  }

  handleSendRequest() {
    this.http.post('https://hay1oitv5j.execute-api.us-east-1.amazonaws.com/dev/hello/send/email', {
      to: this.to,
      subject: this.subject,
      data: {
        invoiceId: this.invoiceId,
        amount: this.amount,
      }
    })
    .subscribe(res => {
      console.log(res.json());
    });
  }
}
