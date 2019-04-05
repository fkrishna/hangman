import { Component, Input } from '@angular/core';

@Component({
  selector: 'hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent {

  @Input() step: number;

  constructor() {}

  show(n) {
   
  }
}
