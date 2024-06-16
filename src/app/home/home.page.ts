import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Translation} from '../translation-card/translation-card.component';
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('translateInput') translateInput!: ElementRef<HTMLTextAreaElement>;

  public translateTxt: string = '';

  translations: Translation[] = [];

  public translateHistory: Translation[] = [];

  constructor(private http: HttpClient, private navCtrl: NavController) {

  }

  private cachedToken: string = '';
  
  private baseUrl: string = 'https://wordiest-back-295ae7bf781c.herokuapp.com';

  async ngOnInit() {
    this.cachedToken = await this.getToken();
    this.translations = await this.updateTranslations();
  }

  private async getToken(): Promise<string>{
    const {value: savedToken} = await Preferences.get({key: 'token'});

    if(savedToken) return savedToken;

    return firstValueFrom(this.http.post<{token: string}>(`${this.baseUrl}/auth`,null)).then(({token}) => {
      Preferences.set({key: 'token', value: token})
      return token;
    })

  }

  private async updateTranslations(): Promise<any>{
    return firstValueFrom(this.http.get<Translation[]>(`${this.baseUrl}/translate`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.cachedToken}`)
    })).then(result => {
      return result;
    })
  }

  handleEnter(event: KeyboardEvent){

    if(event.code == 'Enter'){
    this.translateInput.nativeElement.blur();
    this.http.post<Translation>(`${this.baseUrl}/translate`, {
      from: 'es',
      to: 'en',
      text: this.translateTxt
    },{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.cachedToken}`)
    }).subscribe({
      next: (translation) => {
            this.translations.unshift(translation);
      }
    })

    this.translateTxt = '';

    }
  }

  practice(){
    this.navCtrl.navigateForward(['/practice']);
  }

}
