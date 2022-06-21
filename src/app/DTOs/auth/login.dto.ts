export class LoginDTO {
    constructor(
        public phone_number: number,
        public password: string,
        public device_uuid: string,
    ) {

    }
}

export class VerificationLoginDTO {
    constructor(
        public phone_number: number,
        public verification_code: number,
        public device_uuid: string,

    ) {

    }
}