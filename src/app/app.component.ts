import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ToastController, IonicApp, Keyboard } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public static backButtonPressedOnceToExit = false; 
  backButtonPressed: boolean = false;

  // rootPage: any = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public toastCtrl: ToastController,
    private keyboard: Keyboard,
    public ionicApp: IonicApp,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.check_auth();
      //注册返回键事件
      //this.registerBackButtonAction();
    });
  }

  // 判断是否登录
  check_auth(): void {
    this.storage.get('AUTH_TOKEN').then(res => {
      if (res != null) {
        this.nav.setRoot(TabsPage);
      } else {
        this.nav.setRoot(LoginPage);
      }
    })
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      console.log("Back button pressed. ");

      //如果键盘开启则隐藏键盘
      if (this.keyboard.isOpen()) {
        this.keyboard.close();
        return;
      }

      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let activeVC = this.nav.getActive();
      let page = activeVC.instance;
      console.log("App page: " + this.nav.getActive().name);

      if (page instanceof LoginPage) {
        this.platform.exitApp();
        return;
      }

      let tabs = page.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000); //2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
