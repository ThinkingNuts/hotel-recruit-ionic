import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../api/resource';
import { RecruitViewModel } from '../../view-model/recruit-model';

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
    schedules: '',
    edit: false 
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
    if (navParams.get('item')) {
       this.recruit = navParams.get('item')
       this.data.edit = true
    }
  }

  create(): void {
    this.recruit.HotelId = 1;
    this.rs.RecruitCreate(this.recruit).subscribe((res) => {
      if (res.json().state) {
        this.navCtrl.push('TabsPage');
      }
    });
  }

  edit(): void {
    this.rs.RecruitEdit(this.recruit).subscribe((res) => {
      if (res.json().state) {
        this.navCtrl.pop();
      }
    });
  }

}
