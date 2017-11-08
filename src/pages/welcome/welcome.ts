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
    { title: "风景-1", image: "assets/images/001.jpg" },
    { title: "风景-2", image: "assets/images/002.jpg" },
    { title: "风景-3", image: "assets/images/003.jpg" }
  ];

  private gridMenu = [
    {
      rowId: 1,
      cols: [{
        title: "发布列表",
        icon: "briefcase",
        color: "primary",
        linkPage: "RecruitedListPage",
        isImage: false,
        imageUrl: ""
      }, {
        title: "设置",
        icon: "settings",
        color: "primary",
        linkPage: "SettingsPage",
        isImage: false,
        imageUrl: ""
      }, {
        title: "退出登录",
        icon: "log-out",
        color: "primary",
        linkPage: "log-out",
        isImage: false,
        imageUrl: ""
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
