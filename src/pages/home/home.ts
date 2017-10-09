import { Component } from '@angular/core';
import { App, IonicPage, NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';

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

  constructor(public navCtrl: NavController, private app: App) {
  }

  itemSelected() {
    this.app.getRootNav().push(AboutPage);
  }
}
