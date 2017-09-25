import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

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
  private username: any
  private password: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    private formBuilder: FormBuilder,
    public storage: Storage
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
    })
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  login() {
    this.rs.Login(this.user).subscribe((res) => {
      if (res.json().state) {
        this.storage.set('AUTH_TOKEN', JSON.stringify(res.json().token));
        this.storage.set('AUTH_INFO', JSON.stringify(res.json().data));
        this.navCtrl.push(TabsPage);
      } else {
        console.log('登录失败！');
      }
    });
  }
}
