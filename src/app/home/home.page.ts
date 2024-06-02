import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Translation} from '../translation-card/translation-card.component';
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NavController } from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

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
;
  private baseUrl: string = 'https://wordiest-back-295ae7bf781c.herokuapp.com';

  async ngOnInit() {
    this.cachedToken = await this.getToken();
    this.translations = await this.updateTranslations();

        // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      console.log('Trying to catch push notifications');
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    })
    .catch(err => {
      console.log('Notifications were never requested!');
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
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
