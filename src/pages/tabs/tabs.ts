import { Component } from '@angular/core';

import { RecruitedListPage } from '../recruited-list/recruited-list';
import { RecruitCreatePage } from '../recruit-create/recruit-create';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RecruitedListPage;
  tab2Root = RecruitCreatePage;
  tab3Root = HomePage;

  constructor() {

  }
}