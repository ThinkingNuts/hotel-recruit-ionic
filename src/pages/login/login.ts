import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserViewModel } from '../../view-model/user-model';
import { AuthProvider } from '../../providers';

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
export class LoginPage {

  private user: UserViewModel = this.userViewModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public userViewModel: UserViewModel
  ) {
  }
  
  login() {
    this.authProvider.login(this.user);
  }

}
