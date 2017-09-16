import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RecruitedDetailPage } from '../recruited-detail/recruited-detail';
import { ResourceService } from '../../api/resource';
import { OrderModel } from '../../view-model/order-model';

/**
 * Generated class for the CandidateDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate-detail',
  templateUrl: 'candidate-detail.html',
})
export class CandidateDetailPage {

  public orderData: OrderModel = new OrderModel()
  public candidate: any
  public RecruitedDetail: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public rs: ResourceService,
  ) {
    this.candidate = navParams.get('item');
    this.RecruitedDetail = navParams.get('recruitedDetail');
  }
  
  editStatus(state: number) {
    this.orderData.GUID = this.candidate.GUID
    this.orderData.OrderId = this.RecruitedDetail.Id
    this.orderData.Mark = this.RecruitedDetail.Mark
    this.orderData.PersonId = this.candidate.Person.Id
    if (state === 1) {
      this.orderData.Status = 2
      this.rs.OrderUpdate(this.orderData).subscribe((res) => {
        this.candidate.StatusStr = '通过'
        this.candidate.Status = 2
        this.presentToast();
      });
    } else {
      this.orderData.Status = 3
      this.rs.OrderUpdate(this.orderData).subscribe((res) => {
        this.candidate.StatusStr = '未通过'
        this.candidate.Status = 3
        this.presentToast();
      });
    }
  }

  presentToast = () => {
    let toast = this.toastCtrl.create({
      message: '修改申请状态成功',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
