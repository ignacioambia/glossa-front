import { Question } from './question-card/question-card.component';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
})
export class PracticePage implements OnInit {

  question: Question = {
    from: 'en',
    to: 'es',
    word: 'Burrow',
    options: [
      {text: 'Madriguera', correctAnswer: true},
      {text: 'Burro'},
      {text: 'Cabaña'},
      {text: 'Telaraña'},
    ]
  }

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

}
