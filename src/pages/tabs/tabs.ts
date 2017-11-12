import { Component, ViewChild } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { RecruitedListPage } from '../recruited-list/recruited-list';
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';
import { NaticeBackServiceProvider } from '../../providers/natice-back-service/natice-back-service';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  tab1Root = MessagePage;
  tab2Root = WelcomePage;
  tab3Root = RecruitedListPage;
  tab4Root = HomePage;

  constructor(public backButtonService: NaticeBackServiceProvider,
    private platform: Platform) {
    platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(this.tabs);
    });
  }
}