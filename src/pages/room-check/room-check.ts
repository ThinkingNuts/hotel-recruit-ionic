import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RoomCheckPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-check',
  templateUrl: 'room-check.html',
})
export class RoomCheckPage {
  public data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = [{color: 'yellow'},{color: 'yellow'},{color: 'yellow'},{color: 'grey'},{color: 'grey'},{color: 'grey'},];
  }

  change(index) {
    if (this.data[index].color === 'yellow') {
      this.data[index].color = 'green';
    } else if (this.data[index].color === 'green') {
      this.data[index].color = 'yellow';
    }
  }

}
