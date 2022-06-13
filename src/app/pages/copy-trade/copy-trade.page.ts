import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-copy-trade',
  templateUrl: './copy-trade.page.html',
  styleUrls: ['./copy-trade.page.scss'],
})
export class CopyTradePage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  user: UserModel;
  userInformationForm: FormGroup;
  isAcceptRules = false;
  previusLnegthDateOfBirthInput = 0;
  previusValueDateOfBirthInput = 0;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    public userService: UserService
  ) {
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true).then();
  }

  ionViewWillEnter() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.userInformationForm = new FormGroup({
        full_name: new FormControl(this.user.user.full_name, { validators: [Validators.required] }),
        phone_number: new FormControl(this.user.user.phone_number, { validators: [Validators.required] }),
        national_code: new FormControl(this.user.user.national_code, { validators: [Validators.required] }),
        date_of_birth: new FormControl(this.user.user.date_of_birth, { validators: [Validators.required] }),
        father_name: new FormControl(this.user.user.father_name, { validators: [Validators.required] }),
        place_of_issue: new FormControl(this.user.user.place_of_issue, { validators: [Validators.required] }),
      });
    });
  }

  ngOnInit() { }

  moveToNextSlide() {
    this.slides.lockSwipes(false).then();
    this.slides.slideNext().then();
    this.slides.lockSwipes(true).then();
  }


  acceptRules(event) {
    this.isAcceptRules = event.detail.checked;
  }

  changeDateOfBirth(event) {
    const currentLength = event.detail.value.length
    
    if (currentLength > this.previusLnegthDateOfBirthInput) {
      console.log(this.previusLnegthDateOfBirthInput == 1 || this.previusLnegthDateOfBirthInput == 4);
      console.log(currentLength, this.previusLnegthDateOfBirthInput);
      
      if (this.previusLnegthDateOfBirthInput == 1 || this.previusLnegthDateOfBirthInput == 4) {
        this.userInformationForm.controls.date_of_birth.setValue(event.detail.value + '/')
      }
    } else {
      const formVal: string = event.detail.value;
      if (currentLength == 3 || currentLength == 6) {
        this.userInformationForm.controls.date_of_birth.setValue(formVal.slice(0, -1))
      }
    }
    this.previusLnegthDateOfBirthInput = currentLength;
  }

  saveData() {
    const inputs = this.userInformationForm.controls;
    this.user.user.date_of_birth = inputs.date_of_birth.value;
    this.user.user.father_name = inputs.father_name.value;
    this.user.user.place_of_issue = inputs.place_of_issue.value;
    this.userService.editUserInfo(this.user).subscribe(res => {
      this.moveToNextSlide();
    })
  }
  
}
