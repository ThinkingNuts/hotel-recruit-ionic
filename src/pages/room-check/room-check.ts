import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../api/resource';

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
  public Rooms: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
  ) {
    this.rs.GetGrabOrder(navParams.get('id')).subscribe((res) => {
      this.Rooms = res.json();
    });
  }

  change(index) {
    if (this.Rooms[index].RommStatus === 1) {
      this.Rooms[index].RommStatus = 2;
    } else if (this.Rooms[index].RommStatus === 2) {
      this.Rooms[index].RommStatus = 1;
    }
  }
}
