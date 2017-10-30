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
    this.orderData.OrderId = this.RecruitedDetail.Id
    this.orderData.PersonId = this.candidate.Person.Id
    if (state === 0) {
      this.orderData.Status = 4
      this.rs.OrderUpdate(this.candidate.GUID, this.orderData).subscribe((res) => {
        this.candidate.StatusStr = '拒绝'
        this.candidate.Status = 4
        this.presentToast('修改申请状态成功');
      });
    } else {
      this.orderData.Status = state + 1
      this.rs.OrderUpdate(this.candidate.GUID, this.orderData).subscribe((res) => {
        if (state == 1) {
          this.candidate.StatusStr = '预录用'
        } else {
          if (!res.json().state) {
            this.presentToast(res.json().message);
            return;
          }
          this.candidate.StatusStr = '录用'
        }
        this.candidate.Status = state + 1
        this.presentToast('修改申请状态成功');
      });
    }
  }

  presentToast = (mes) => {
    let toast = this.toastCtrl.create({
      message: mes,
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
