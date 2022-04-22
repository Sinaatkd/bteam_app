import { DeviceModel } from './../../models/device.model';
export class RegisterDTO {
    constructor(
        public password: string,
        public full_name: string,
        public phone_number: number,
        public national_code: number,
        public from_city: string,
        public device: DeviceModel,
        public pk: number // invater identifier code,
    ) {
        
    }
}