import { Component } from '@angular/core';

import { MessagePage } from '../message/message';
import { RecruitedListPage } from '../recruited-list/recruited-list';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MessagePage;
  tab2Root = RecruitedListPage;
  tab3Root = HomePage;

  constructor() {

  }
}