import { Component } from '@angular/core';

import { MessagePage } from '../message/message';
import { RecruitedListPage } from '../recruited-list/recruited-list';
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MessagePage;
  tab2Root = WelcomePage;
  tab3Root = RecruitedListPage;
  tab4Root = HomePage;

  constructor() {

  }
}