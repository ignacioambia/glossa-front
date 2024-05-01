import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PracticePageRoutingModule } from './practice-routing.module';

import { PracticePage } from './practice.page';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { QuestionCardComponent } from './question-card/question-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { BulletComponent } from './bullet/bullet.component';
import { OptionComponent } from './option/option.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PracticePageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    PracticePage,
    ProgressBarComponent,
    QuestionCardComponent,
    BulletComponent,
    OptionComponent
  ],
})
export class PracticePageModule {}
