import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { LoginPage } from '../../login/login';
import { UpdatePasswordPage } from '../update-password/update-password';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private storage: Storage,
    private app: App,
  ) {
  }

  clearCache() {
    this.alertCtrl.create({
      title: '确认清除缓存？',
      subTitle: '清除后需要重新登录',
      buttons: [{ text: '取消' },
      {
        text: '确定',
        handler: () => {
          this.storage.clear();
          this.navCtrl.push(LoginPage);
        }
      }
      ]
    }).present();
  }

  changePassword() {
    this.navCtrl.push(UpdatePasswordPage);
  }

}
