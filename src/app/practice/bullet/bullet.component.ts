import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bullet',
  templateUrl: './bullet.component.html',
  styleUrls: ['./bullet.component.scss'],
})
export class BulletComponent  implements OnInit {

  @Input() active: boolean | null = null;
  @Input() type: 'success' | 'error' = 'success';

  constructor() { }

  ngOnInit() {}

}
