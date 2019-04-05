import { Component, ViewChild, OnInit } from '@angular/core';
import { LibraryService } from './service/library.service';
import { KeypadComponent } from './keypad/keypad.component';
import { IKey } from './keypad/Ikey';
import { GState } from './enum/gstate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  state: GState = 0;

  _life: number = 10;

  notification: string;

  plainWord: string;
  
  secretWord: string[] = []

  showNextBtn: boolean = false;

  @ViewChild(KeypadComponent) keyboard: KeypadComponent;

  constructor(private library: LibraryService) {}

  ngOnInit() {

    let word = this.library.next();
    
    if( ! word ) 
      throw new Error('couldn\'t get any word from this library');
    else {
      this.hide(word);
      this.notification = '** guess a letter **';
    }
  }

  get life(): number {
    return this._life;
  }

  set life(value: number) {
    this._life = (value < 0) ? 0 : value;
  }

  onKeyPressed(key: IKey): void {

    this.notification = ''

    //console.log(key);

    if ( ! this.resolved(key) ) 
        this.life--;

    if ( this.isOver() ) {

      this.keyboard.disable();

      switch(this.state)
      {
        case GState.RESOLVED:
        this.notification = '** Congratulation **';
        break;
        case GState.MISSED:
        this.notification = `Sorry :( the correct word was ${this.plainWord.toUpperCase()}`;
        break;
      }

      this.showNextBtn = true;
    }
  }

  resolved(key: IKey): boolean {

    let found: boolean = false;

    for (let i = 1, n = this.plainWord.length; i < n - 1; i++) {
      if (this.plainWord[i] == key.code) {
        this.secretWord[i] = key.code;
        found = true;
      }
    }

    return found;
  }

  nextWord(): void {

    this.showNextBtn = false;
    
    let word = this.library.next();
    
    if(word) {
      this.hide(word);
      this.life = 10;
      this.keyboard.flush();
      this.keyboard.enable();
      this.notification = '** guess a letter **';
    }
    else { 
      this.keyboard.disable();
      this.notification = 'you have completed the game';
    }
  }

  hide(word: string): void {
    this.plainWord = word;
    this.secretWord = this.plainWord.split('');
    for (let i = 1; i < this.plainWord.length - 1; i++) {
      this.secretWord[i] = '*';
    }
  }

  isSecretWordFound(): boolean {
    return this.plainWord == this.secretWord.join("");
  }

  getSecretWord(): string {
    return this.secretWord.join("");
  }

  isOver() {
    
    let over = false;

    if( this.isSecretWordFound() ) {
      over = true;
      this.state = GState.RESOLVED;
    }

    if(this.life == 1) {
      over = true;
      this.state = GState.MISSED;
    }

    return over;
  }
}