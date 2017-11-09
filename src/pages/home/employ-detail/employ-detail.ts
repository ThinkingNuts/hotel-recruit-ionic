import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App  } from 'ionic-angular';
import { ResourceService } from '../../../api/resource';
import { FinishWorkPage } from '../finish-work/finish-work';
import { API_ROOT } from '../../../api/config'

/**
 * Generated class for the EmployDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employ-detail',
  templateUrl: 'employ-detail.html',
})
export class EmployDetailPage {
  public employ: any
  public API_ROOT = API_ROOT
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    private app: App,
  ) {
    this.employ = navParams.get('item');
  }

  removeItem(message) {
    this.app.getRootNav().push(FinishWorkPage, {
      item: this.employ,
      message: message
    });
  }
}
