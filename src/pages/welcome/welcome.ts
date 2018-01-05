import { Component } from '@angular/core';
import { App, IonicPage, NavController, Platform, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController,
    private app: App,
    private storage: Storage,
    private alertCtrl: AlertController,
    private platform: Platform,
  ) {
  }

  slides = [
    { title: "风景-1", image: "assets/images/01.jpg" },
    { title: "风景-2", image: "assets/images/02.jpg" },
    { title: "风景-3", image: "assets/images/03.jpg" }
  ];

  private gridMenu = [
    {
      rowId: 1,
      cols: [{
        title: "消息",
        icon: "ios-volume-up-outline",
        color: "primary",
        linkPage: "MessagePage",
        isImage: true,
        imageUrl: "./assets/images/2.png"
      }, 
      {
        title: "增加用工",
        icon: "md-add-circle",
        color: "primary",
        linkPage: "RecruitCreatePage",
        isImage: true,
        imageUrl: "./assets/images/1.png"
      }, {
        title: "今日用工",
        icon: "ios-list-outline",
        color: "primary",
        linkPage: "TodayEmploiesPage",
        isImage: true,
        imageUrl: "./assets/images/3.png"
      }, {
        title: "设置",
        icon: "settings",
        color: "primary",
        linkPage: "SettingsPage",
        isImage: true,
        imageUrl: "./assets/images/4.png"
      }]
    }];

  openPage(pageName: string) {
    if (!pageName || pageName.length == 0) {
      return;
    }
    if (pageName == 'log-out') {
      this.loginOut();
      return;
    }
    this.navCtrl.push(pageName);
  }

  loginOut() {
    this.alertCtrl.create({
      title: '确认退出登录？',
      buttons: [{text: '取消'},
        {
          text: '确定',
          handler: () => {
            this.storage.clear();
            this.app.getRootNav().push('LoginPage');
          }
        }
      ]
    }).present();
  }
}
