import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../api/resource';
import { Storage } from '@ionic/storage';

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
  messages: Array<any> = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    public storage: Storage,
  ) {
    this.getMessage(null);
  }

  getMessage(refresher) {
    this.storage.get('AUTH_GUID').then(res => {
      if (res) {
        this.rs.HotelMessage(res).subscribe((res) => {
          this.messages = res.json();
          if (refresher) {
            refresher.complete();
          }
        });
      }
    });
  }

  showMessage(item): void {
    this.navCtrl.push("MessageDetailPage", { "message": item });
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getMessage(refresher);
  }

}
