import { Component, Input, OnInit } from '@angular/core';

export interface OptionProps {
  text: string,
  correctAnswer?: boolean
}

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent  implements OnInit {

  optionActive: boolean | null = null;

  @Input() option!: OptionProps;

  constructor() { }

  ngOnInit() {}

  handleSelection(){
    this.optionActive = !this.optionActive;
  }

}
