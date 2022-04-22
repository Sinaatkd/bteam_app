import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  messages: any = [];
  isLoading = true;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserMessages().subscribe(res => {
      this.messages = res;
      this.isLoading = false;
      this.userService.seenAllMessage().subscribe();
      this.userService.getUser().subscribe(user => {
        const u = user;
        u.unread_messages = 0;
        this.userService.setUser(u);
      });
    });
  }

}
