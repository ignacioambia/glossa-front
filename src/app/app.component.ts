import { Component } from '@angular/core';
import { Device, GetLanguageCodeResult } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {}

  async ngOnInit() {
    const { value: lang } = await Device.getLanguageCode();
    const allowedLangs = ['en', 'es'];
    this.translateService.use(allowedLangs.includes(lang) ? lang : 'en');
  }
}
