import { UserService } from './services/user.service';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private userService: UserService,
  ) {
    this.document.dir = 'rtl';
  }

  ngAfterViewInit() {
    this.userService.getUserInfo().subscribe(user => {
      this.userService.setUser(user);
    });
  }
}
