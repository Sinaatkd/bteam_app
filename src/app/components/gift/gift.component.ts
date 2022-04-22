import { Component, OnInit } from '@angular/core';
import { BteamPartyService } from 'src/app/services/bteam-party.service';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss'],
})
export class GiftComponent implements OnInit {

  isLoading = true;
  logs: any = []

  constructor(
    private bteamPartyService: BteamPartyService
  ) { }

  ngOnInit() {
    this.bteamPartyService.giftsLog().subscribe(logs => {
      this.logs = logs;
      this.isLoading = false;
    })
  }

}
