import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { UserViewModel } from '../../view-model/user-model';
import { ResourceService } from '../../api/resource';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  private user: UserViewModel = new UserViewModel()
  private loginForm: FormGroup
  canLeave: boolean = false;
  GUID: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    private formBuilder: FormBuilder,
    public storage: Storage,
    private platform: Platform,
    public alertCtrl: AlertController
  ) {
    this.canLeave = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
    })
  }

  ionViewWillEnter() {
    this.canLeave = false;
    this.storage.get('AUTH_TOKEN').then((res) => {
      this.GUID = res;
    });
  }

  ionViewCanLeave(): boolean {
    let bool = !!this.GUID;
    if (this.canLeave || bool) {
      return true;
    } else {
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
      return false;
    }
  }

  login() {
    this.rs.Login(this.user).subscribe((res) => {
      if (res.json().state) {
        this.GUID = res.json().data.GUID;
        this.storage.set('AUTH_ACCOUNT_GUID', JSON.stringify(res.json().AccoutGUID));
        this.storage.set('AUTH_GUID', JSON.stringify(res.json().data.GUID));
        this.storage.set('AUTH_INFO', JSON.stringify(res.json().data));
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.showAlert(res.json().message);
      }
    });
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: '登录失败！',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
