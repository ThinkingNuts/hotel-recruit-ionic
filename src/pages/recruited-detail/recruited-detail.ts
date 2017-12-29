import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ResourceService } from '../../api/resource';
import { OrderModel } from '../../view-model/order-model';
import { CandidateDetailPage } from '../candidate-detail/candidate-detail';
import { Storage } from '@ionic/storage';
import { API_ROOT } from '../../api/config'

@IonicPage()
@Component({
  selector: 'page-recruited-detail',
  templateUrl: 'recruited-detail.html',
})
export class RecruitedDetailPage {
  public orderData: OrderModel = new OrderModel()
  public API_ROOT = API_ROOT
  public RecruitedDetail: any
  public Candidates: any = new Object()
  pet: string = "申请人列表";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    private app: App,
    public storage: Storage,
  ) {
    this.RecruitedDetail = navParams.get('item');
    this.storage.get('AUTH_INFO').then((res) => {
      this.RecruitedDetail.address = JSON.parse(res).MailingAddress
    });
    this.rs.PersonOrders(this.RecruitedDetail.Id).subscribe((res) => {
      this.Candidates = res.json();
      console.log(this.Candidates);
    });
  }

  itemTapped(item) {
    this.navCtrl.push(CandidateDetailPage, {
      item: item,
      recruitedDetail: this.RecruitedDetail
    });
  }

}
