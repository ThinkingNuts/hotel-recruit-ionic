import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../api/resource';

/**
 * Generated class for the CandidateCommentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate-comment',
  templateUrl: 'candidate-comment.html',
})
export class CandidateCommentPage {
  public comments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
  ) {
    this.rs.PersonEvaluate(navParams.get('item')).subscribe((res) => {
      this.comments = res.json().Details;
      console.log(this.comments);
    });
  }
}
