import { StoryService } from './../../services/story.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonImg } from '@ionic/angular';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.page.html',
  styleUrls: ['./story-detail.page.scss'],
})
export class StoryDetailPage implements OnInit {
  @ViewChild('storyFile') storyFile: IonImg;

  userId;
  stories = [];
  currentStoryId = 0;
  contentLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.storyService.getUserStoriesDetail(params.userId).subscribe((res) => {
        this.currentStoryId = res.find((story) => story.is_visited === false);
        if (this.currentStoryId == undefined) {
          this.currentStoryId = res[0].id;
        } else {
          this.currentStoryId = res.find(
            (story) => story.is_visited === false
          ).id;
        }
        this.stories = res;
      });
    });
  }

  showPreviousStory() {
    const previousStories = this.stories.filter(
      (story) => story.id < this.currentStoryId
    );
    if (previousStories.length > 0) {
      this.currentStoryId = previousStories[previousStories.length - 1].id;
    }
  }

  showNextStory() {
    const nextStories = this.stories.filter(
      (story) => story.id > this.currentStoryId
    );
    if (nextStories.length > 0) {
      this.currentStoryId = nextStories[0].id;
    }
  }

  getStoryContent() {
    return this.stories.find((story) => story.id === this.currentStoryId)
      .story_file;
  }

  setVisit() {
    this.storyService.setStoryVisitors(this.currentStoryId).subscribe();
  }

  ionImgDidLoad(event) {
    this.contentLoaded = true;
    // this.setVisit()
  }

  ionImgWillLoad(event) {
    this.contentLoaded = false;
  }
}
