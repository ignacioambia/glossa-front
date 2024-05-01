import { Component, OnInit, Input } from '@angular/core';

export interface TranslationElement {


  lang: string,
  text: string
}

export interface Translation {
  _id: number;
  from: TranslationElement;
  to: TranslationElement;

}

@Component({
  selector: 'app-translation-card',
  templateUrl: './translation-card.component.html',
  styleUrls: ['./translation-card.component.scss'],
})
export class TranslationCardComponent  implements OnInit {

  @Input() translation!: Translation;
  constructor() { }

  ngOnInit() {}

}
