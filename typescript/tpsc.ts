import { Component } from '@angular/core';

@Component({
  selector: 'love',
  templateUrl: 'tpsc.html'
})
export class LoveComponent {
  constructor() {
    setTimeout(() => console.log('settimeout called'), 2000);
    const map = new Map().set('A', 1).set('B', 2).set('C', 3);
    console.log(map.size);
  }
}
