import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TranslationElement } from 'src/app/translation-card/translation-card.component';
import { OptionComponent, OptionProps } from '../option/option.component';

export interface Question {
  word: string,
  from: string,
  to: string,
  options: OptionProps[]
}

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent  implements OnInit {

  @Input() question!: Question;
  @ViewChildren(OptionComponent) optionsRef!: QueryList<OptionComponent>

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit(){
  }

  chooseOption(option: OptionProps){
    this.optionsRef.toArray().forEach((e: OptionComponent) => {
      if(e.option.text !== option.text){
        e.optionActive = null;
      }
    });
  }

}
