import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController } from '@ionic/angular';
import { BASE_URL } from 'src/app/utilities/variables';

@Component({
  selector: 'app-full-authentication',
  templateUrl: './full-authentication.component.html',
  styleUrls: ['./full-authentication.component.scss'],
})
export class FullAuthenticationComponent implements AfterViewInit {
  @ViewChild(IonSlides) slides: IonSlides;

  inputType = '';
  user: UserModel;
  userInformationForm: FormGroup;
  isAcceptRules = false;
  selectedFacePicture = null;
  BASE_URL = BASE_URL;
  currentSlide = 0;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(
    public userService: UserService,
    public loadingCtrl: LoadingController
  ) {}

  ngAfterViewInit() {
    this.loadingCtrl
      .create({
        message: 'لطفا صبر کنید',
        mode: 'ios',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.userService.getUser().subscribe((user) => {
          this.user = user;
          this.userInformationForm = new FormGroup({
            full_name: new FormControl(this.user.user.full_name, {
              validators: [Validators.required],
            }),
            phone_number: new FormControl(this.user.user.phone_number, {
              validators: [Validators.required],
            }),
            national_code: new FormControl(this.user.user.national_code, {
              validators: [Validators.required],
            }),
            date_of_birth: new FormControl(this.user.user.date_of_birth, {
              validators: [Validators.required],
            }),
            father_name: new FormControl(this.user.user.father_name, {
              validators: [Validators.required],
            }),
            place_of_issue: new FormControl(this.user.user.place_of_issue, {
              validators: [Validators.required],
            }),
          });
          setTimeout(() => {
            if (user.user.face) {
              this.slides.length().then((value) => {
                this.slides.lockSwipes(false).then();
                this.slides.slideTo(value + 1).then();
                this.currentSlide = 6;
                this.slides.lockSwipes(true).then();
              });
            }
            this.slides.lockSwipes(true).then();
            loadingEl.dismiss();
          }, 1000);
        });
      });
  }

  moveToNextSlide() {
    this.currentSlide += 1;
    this.slides.lockSwipes(false).then();
    this.slides.slideNext().then();
    this.slides.lockSwipes(true).then();
  }

  acceptRules(event) {
    this.isAcceptRules = event.detail.checked;
  }

  saveData() {
    this.loadingCtrl
      .create({
        message: 'لطفا صبر کنید',
        mode: 'ios',
      })
      .then((loadingEl) => {
        loadingEl.present();
        const inputs = this.userInformationForm.controls;
        this.user.user.date_of_birth = inputs.date_of_birth.value;
        this.user.user.father_name = inputs.father_name.value;
        this.user.user.place_of_issue = inputs.place_of_issue.value;
        this.user.user.face = this.selectedFacePicture;
        this.userService.editUserInfo(this.user).subscribe(
          (res) => {
            loadingEl.dismiss();
            this.moveToNextSlide();
          },
          (err) => {
            loadingEl.dismiss();
            console.log(err);
          }
        );
      });
  }

  getBase64Face(file) {
    let me = this;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.selectedFacePicture = reader.result;
      me.saveData();
    };
    reader.onerror = function (error) {};
  }

  facePictureChanged(event) {
    const file = event.target.files[0];
    this.getBase64Face(file);
  }

  ionInputCalled(event) {
    if (event.type === 'ionInput') {
      this.inputType = event.detail.inputType;
    } else {
      const inputValueLength = event.detail.value.length;
      // deleteContentBackward
      //  insertText
      console.log(inputValueLength);

      if (
        (inputValueLength === 4 || inputValueLength === 7) &&
        this.inputType === 'insertText'
      ) {
        this.userInformationForm.controls.date_of_birth.setValue(
          event.detail.value + '-'
        );
      } else if (
        (inputValueLength === 5 || inputValueLength === 8) &&
        this.inputType === 'deleteContentBackward'
      ) {
        const newValue =
          this.userInformationForm.controls.date_of_birth.value.slice(0, -2);
        this.userInformationForm.controls.date_of_birth.setValue(newValue);
      } else if (
        (inputValueLength === 4 || inputValueLength === 7) &&
        this.inputType === 'deleteContentBackward'
      ) {
        const newValue =
          this.userInformationForm.controls.date_of_birth.value.slice(0, -1);
        this.userInformationForm.controls.date_of_birth.setValue(newValue);
      }
    }
  }
}
