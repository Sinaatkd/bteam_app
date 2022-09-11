import { StoryService } from './../../services/story.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonImg } from '@ionic/angular';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.page.html',
  styleUrls: ['./story-detail.page.scss'],
})
export class StoryDetailPage implements OnInit {
  @ViewChild('storyFile') storyFile: IonImg;
  @ViewChild('video') video: ElementRef;

  userId;
  stories = [];
  currentStoryId = 0;
  contentLoaded = false;
  fileFormat;

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
      this.fileFormat = this.getUrlExtension(this.getStoryContent());
      this.contentLoaded = false;
    }
  }

  showNextStory() {
    const nextStories = this.stories.filter(
      (story) => story.id > this.currentStoryId
    );
    if (nextStories.length > 0) {
      this.currentStoryId = nextStories[0].id;
      this.fileFormat = this.getUrlExtension(this.getStoryContent());
      this.contentLoaded = false;
    }
  }

  getStoryContent() {
    const storyFile = this.stories.find(
      (story) => story.id === this.currentStoryId
    ).story_file;
    this.checkVideo();
    return storyFile;
  }

  setVisit() {
    this.storyService.setStoryVisitors(this.currentStoryId).subscribe();
  }

  ionImgDidLoad(event) {
    this.contentLoaded = true;
    this.setVisit();
  }

  getUrlExtension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  ionViewDidEnter() {
    this.fileFormat = this.getUrlExtension(this.getStoryContent());
  }

  checkVideo() {
    const video = document.getElementById('video');
    if (video) {
      video.onloadeddata = (event) => {
        this.setVisit();
        this.contentLoaded = true;
      };
    }
  }
}
