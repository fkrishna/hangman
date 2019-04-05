import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {

  private words: string[] = ['krishna', 'marron', 'venezuela'];

  /** current index  */
  private index: number = -1;

  constructor() { }

  /**
   * Get a next word 
   */
  next(): string {
    
    let word = null;

    if(this.index < this.words.length) {
      this.index++;
      word = this.words[this.index];
    }
    
    return word;
  }
}