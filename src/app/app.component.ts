import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ToastController } from 'ionic-angular';
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

  // rootPage: any = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public toastCtrl: ToastController
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

      this.platform.registerBackButtonAction(function(e){  
        if(MyApp.backButtonPressedOnceToExit){  
          this.platform.exitApp();  
        }else{  
          MyApp.backButtonPressedOnceToExit = true;  
          let toast = this.toastCtrl.create({  
            message: '再按一次退出',  
            duration: 2000,  
            position: 'bottom'  
          });  
          toast.present();  
          setTimeout(function(){  
            MyApp.backButtonPressedOnceToExit = false;  
          },2000)  
        }  
      },101)  
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

}
