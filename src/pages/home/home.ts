import { Component } from '@angular/core';
import { App, IonicPage, NavController, Platform, AlertController } from 'ionic-angular';
import { AboutPage } from './about/about';
import { Storage } from "@ionic/storage";
import { LoginPage } from '../login/login';
import { SettingsPage } from './settings/settings';
import { MinePage } from './mine/mine';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  userInfo: any;

  constructor(
    public navCtrl: NavController,
    private app: App,
    private storage: Storage,
    private alertCtrl: AlertController,
    private platform: Platform,
  ) {
  }

  ionViewWillEnter() {
    this.storage.get('AUTH_INFO').then(res => {
      if (res) {
        this.userInfo = JSON.parse(res);
        console.log(this.userInfo);
      }
    });
  }

  edit() {
    this.navCtrl.push(MinePage, { 'userInfo': this.userInfo });
  }

  exitSoftware() {
    this.alertCtrl.create({
      title: '确认退出软件？',
      buttons: [{text: '取消'},
        {
          text: '确定',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    }).present();
  }

  loginOut() {
    this.alertCtrl.create({
      title: '确认重新登录？',
      buttons: [{text: '取消'},
        {
          text: '确定',
          handler: () => {
            this.storage.clear();
            this.app.getRootNav().push(LoginPage);
          }
        }
      ]
    }).present();
  }

  map() {

  }

  setting() {
    this.navCtrl.push(SettingsPage);
  }

  about() {
    this.app.getRootNav().push(AboutPage);
  }
}
