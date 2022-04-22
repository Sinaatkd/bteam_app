import { DeviceModel } from './../../../models/device.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { RegisterService } from './../../../services/auth/register.service';
import { Component, OnInit } from '@angular/core';
import { RegisterDTO } from 'src/app/DTOs/auth/register.dto';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  errors = [];

  constructor(
    private registerService: RegisterService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      fullName: new FormControl(null, { validators: [Validators.required, Validators.pattern('^[\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC, \s-]+$')], updateOn: "change" }),
      phoneNumber: new FormControl(null, { validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')], updateOn: "change" }),
      nationalCode: new FormControl(null, { validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')], updateOn: "change" }),
      fromCity: new FormControl(null, { validators: [Validators.required], updateOn: "change" }),
      password: new FormControl(null, { validators: [Validators.required], updateOn: "change" }),
      invaterIdentifierCode: new FormControl(null, { updateOn: "change" }),
    });
  }

  onCreateAccount() {
    this.errors = [];
    const data = this.registerForm.controls;
    const fullName = data.fullName.value;
    const password = data.password.value;
    const phoneNumber = data.phoneNumber.value;
    const fromCity = data.fromCity.value;
    const nationalCode = data.nationalCode.value
    const invaterIdentifierCode = data.invaterIdentifierCode.value
    let device_uuid = '';
    Device.getId().then(uuid => {
      device_uuid = uuid.uuid.toString();
      Device.getInfo().then(info => {
        const device = new DeviceModel(device_uuid, info.platform, info.model, info.operatingSystem, info.osVersion)
        const registerDTO = new RegisterDTO(password, fullName, phoneNumber, nationalCode, fromCity, device, invaterIdentifierCode);
        this.registerService.registerUser(registerDTO).subscribe(res => {
          this.dismisLoading();
          this.navCtrl.navigateBack('/login');
        }, err => {
          if (err.status === 400) {
            if (err.error.national_code && err.error.national_code[0] === 'user with this national code already exists.') {
              this.errors.push('این کد ملی از قبل استفاده شد');
            }
            if (err.error.phone_number && err.error.phone_number[0] === 'user with this phone number already exists.') {
              this.errors.push('این شماره تلفن از قبل استفاده شده');
            }
            if (err.error.device.uuid && err.error.device.uuid[0] === 'device with this uuid already exists.') {
              this.errors.push('با این دیوایس از قبل اکانت ساخته شده است')
            }
          }

        });
      });

    });
  }

  setLoading(message: string, mode: 'ios' | 'md') {
    this.loadingCtrl.create({ message, mode }).then(loadingEl => loadingEl.present());
  }

  dismisLoading() {
    setTimeout(() => {
      this.loadingCtrl.dismiss().then().then();
    }, 200);
  }
}
