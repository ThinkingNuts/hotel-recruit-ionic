import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../../api/resource';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EvaluateListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evaluate-list',
  templateUrl: 'evaluate-list.html',
})
export class EvaluateListPage {
  public comments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    public storage: Storage
  ) {
    this.storage.get('AUTH_GUID').then(res => {
      if (res) {
        this.rs.GetEvaluates(res).subscribe((res) => {
          this.comments = res.json().Details;
          console.log(this.comments);
        });
      }
    });
  }
}
