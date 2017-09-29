import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../api/resource';
import { RecruitViewModel } from '../../view-model/recruit-model';
import { RecruitedListPage } from '../recruited-list/recruited-list';

@IonicPage()
@Component({
  selector: 'page-recruit-create',
  templateUrl: 'recruit-create.html',
})
export class RecruitCreatePage {

  private recruit: RecruitViewModel = new RecruitViewModel();

  public ToDate(date): string {
    return new Date(+ new Date(date) + 8 * 3600 * 1000).toISOString()
  }

  public data = {
    currentTime: this.ToDate(new Date()),
    workTypes: '',
    schedules: '',
    departments: '',
    units: ['元/小时', '元/间'],
    unit: '元/小时',
    nums: ['/人'],
    num: '/人',
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
    this.rs.Department().subscribe((res) => {
      this.data.departments = res.json();
    });
    if (navParams.get('item')) {
      this.recruit = navParams.get('item');
      this.data.unit = this.recruit.Billing.replace(/[0-9]/ig, '');
      this.recruit.Billing = this.recruit.Billing.replace(/[^0-9]/ig, '');
      this.recruit.Start = this.ToDate(navParams.get('item').Start);
      this.recruit.End = this.ToDate(navParams.get('item').End);
      this.data.edit = true
    }
  }

  create(): void {
    this.recruit.HotelId = 2;
    this.recruit.Billing = this.recruit.Billing + this.data.unit;
    console.log(this.recruit.Billing);
    this.rs.RecruitCreate(this.recruit).subscribe((res) => {
      if (res.json().state) {
        this.recruit = null
        this.navCtrl.push(RecruitedListPage);
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
