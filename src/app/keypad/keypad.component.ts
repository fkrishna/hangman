import { 
  Component, 
  HostListener, 
  Output, 
  EventEmitter 
} from '@angular/core';

import { IKey } from './Ikey';

@Component({
  selector: 'keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent {

  /* keys of the Keypad */
  private keys: IKey[] = [];

  /* to store each key that has been pressed */
  private buffer: IKey[] = [];

  private ASCII = { a: 97, z: 122 };

  /* state of the keyboard */
  private disabled: boolean = false;

  /**
    * @event Keypad#keyPressed
    * @type {IKey}
    */
  @Output() keyPressed: EventEmitter<IKey> = new EventEmitter<IKey>();

  constructor() {
    this.init();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(e: KeyboardEvent) {
    
    if( ! this.disabled ) {
      let key: IKey = {} as IKey;  
      key.code = e.key.toLocaleLowerCase();
      this.process(key);
    }
    
  }

  /**
   * Process the key that has been pressed by pushing it in the buffer 
   * and letting all subscribers that a key has been pressed
   * @param {IKEY} key 
   */
  private process(key: IKey): void {
    if( ! this.disabled ) {
      let index = this.indexOfKey(key);
      if( ! this.inBuffer(key) && index != -1 ) { 
        this.disableKey(index);
        this.buffer.push(this.keys[index]);
        this.keyPressed.emit(this.keys[index]);
      } 
    } 
  }

  /**
   * Flush the buffer
   */
  flush(): void {
    this.keys.map( key => key.disabled = false);
    this.buffer = [];  
  }

  /**
   * Enable the keyboard 
   */
  enable(): void {
    this.disabled = false;
  }

  /**
   * Disable the keyboard 
   */
  disable(): void {
    this.disabled = true;
  }

  /**
   * Active a key so we can have a visual by setting the 
   * active class in CSS
   * @param {Number} index
   */
  private disableKey(index: number): void {
    this.keys[index].disabled = true;
  }

  /**
   * Get the index of a given key in the keys array
   * @param {IKey} key
   * @return {Number} index
   */
  private indexOfKey(key: IKey): number {

    let index = -1;

    for (let i = 0, n = this.keys.length; i < n; i++)
      index = (this.keys[i].code == key.code) ? i : index;

    return index;
  }

  /**
   * If a given key is in the buffer
   * @param {IKey} key
   * @return {Boolean} 
   */
  private inBuffer(key: IKey): boolean {

    for (let i = 0, n = this.buffer.length; i < n; i++)
    {
      if(this.buffer[i].code == key.code)
        return true;
    }

    return false;
  }
  
  /**
   *  Initialize keys array 
   */
  private init(): void {
    for (let i = this.ASCII.a; i <= this.ASCII.z; i++) {
      this.keys.push({
        code: String.fromCharCode(i),
        disabled: false
      });
    }
  }
}

