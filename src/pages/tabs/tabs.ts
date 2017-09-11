import { Component } from '@angular/core';

import { RecruitedPage } from '../recruited/recruited';
import { RecruitCreatePage } from '../recruit-create/recruit-create';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RecruitedPage;
  tab2Root = RecruitCreatePage;
  tab3Root = HomePage;

  constructor() {

  }
}