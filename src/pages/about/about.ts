import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  private items: AboutItem[] = [{
    name: "软件名称",
    value: "星加酒店管理平台"
  }, {
    name: "软件版本",
    value: "V0.1.0"
  }, {
    name: "公司名称",
    value: "上海金代软件开发有限公司"
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}

class AboutItem {
  name: string;
  value: string;
}
