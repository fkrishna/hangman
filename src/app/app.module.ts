import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KeypadComponent } from './keypad/keypad.component';
import { HangmanComponent } from './hangman/hangman.component';

@NgModule({
  declarations: [
    AppComponent,
    KeypadComponent,
    HangmanComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
