import { Component } from '@angular/core';

import { RecruitedPage } from '../recruited/recruited';
import { RecruitingPage } from '../recruiting/recruiting';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RecruitedPage;
  tab2Root = RecruitingPage;
  tab3Root = HomePage;

  constructor() {

  }
}