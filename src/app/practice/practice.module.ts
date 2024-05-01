import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PracticePageRoutingModule } from './practice-routing.module';

import { PracticePage } from './practice.page';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PracticePageRoutingModule
  ],
  declarations: [PracticePage, ProgressBarComponent]
})
export class PracticePageModule {}
