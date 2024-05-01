import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TranslationCardComponent } from '../translation-card/translation-card.component';
import { ButtonComponent } from '../button/button.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    TranslationCardComponent,
    ButtonComponent,
  ],
})
export class HomePageModule {}
