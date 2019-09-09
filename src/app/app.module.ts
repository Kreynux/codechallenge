import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer.component';
import { VoterTurnoutComponent } from './modules/votes/voter-turnout.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    VoterTurnoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
