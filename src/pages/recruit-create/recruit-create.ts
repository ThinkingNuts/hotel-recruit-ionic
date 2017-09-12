import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../api/resource';
import { RecruitViewModel } from '../../view-model/recruit-model';
import { TabsPage } from '../tabs/tabs';

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

  private recruit: RecruitViewModel = new RecruitViewModel();

  public data = {
    currentTime: (new Date()).toISOString(),
    workTypes: '',
    schedules: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
  ) {
    this.rs.WorkTypes().subscribe((res) => {
      this.data.workTypes = res.json();
    });
    this.rs.Schedules().subscribe((res) => {
      this.data.schedules = res.json();
    });
  }

  create(): void {
    this.recruit.HotelId = 1;
    this.rs.RecruitCreate(this.recruit).subscribe((res) => {
      if (res.json().state) {
        this.navCtrl.push(TabsPage);
      }
    });
  }

}
