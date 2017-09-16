import { Component } from '@angular/core';

import { WelcomePage } from '../welcome/welcome';
import { RecruitedListPage } from '../recruited-list/recruited-list';
import { RecruitCreatePage } from '../recruit-create/recruit-create';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WelcomePage;
  tab2Root = RecruitedListPage;
  tab3Root = RecruitCreatePage;

  constructor() {

  }
}