import { NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {

  @Input('story') story;
  
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  showStoryDetail() {
    this.navCtrl.navigateForward(['/story-detail', this.story.id]).then()
  }
}
