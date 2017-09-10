import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecruitedListPage } from '../recruited-list/recruited-list';
import { ResourceService } from '../../api/resource';

/**
 * Generated class for the RecruitedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recruited',
  templateUrl: 'recruited.html',
})
export class RecruitedPage {
  items: Object

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
  ) {
    this.rs.GetArticles().subscribe((res) => {
      this.items = res.json().data.data;
      console.log(this.items);
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(RecruitedListPage, {
      item: item
    });
  }

}
