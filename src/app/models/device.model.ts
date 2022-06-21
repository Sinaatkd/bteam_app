export class DeviceModel {
    constructor(
        public uuid: string,
        public platform: | 'android' | 'web' | 'ios',
        public model: string,
        public operating_system: 'ios' | 'android' | 'windows' | 'mac' | 'unknown',
        public os_version: string
    ) { }
}