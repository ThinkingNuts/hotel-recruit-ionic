import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecruitCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recruit-create',
  templateUrl: 'recruit-create.html',
})
export class RecruitCreatePage {

  public event = {
    timeStarts: (new Date()).toString(),
    timeEnds: (new Date()).toString()
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log((new Date()).toString());
  }

}
