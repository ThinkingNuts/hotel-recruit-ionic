import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  items: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [{NOTICE_TITLE: '您有新消息', NOTICE_CONTENT: '倪海杰应聘你的酒店客房打扫...', NOTICE_DATE: '2017-11-07 10:00:00'},
    {NOTICE_TITLE: '您有新消息', NOTICE_CONTENT: '倪海杰应聘你的酒店客房打扫...', NOTICE_DATE: '2017-11-07 10:00:00'}
  ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

}
