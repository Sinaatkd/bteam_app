export class TransactionDTO {
    constructor(
        public id: number,
        public payment_mode: 'online' | 'offline',
        public amount: number,
        public validity_rate: number,
        public transaction_status: string,
        public consultant_name: string,
        public user: number,
        public discount_code: number,
        public special_item: any,
        public payment_receipt?: string,
        public is_processing?: boolean,
        public is_confirmation?: boolean,
        public is_send_receipt?: boolean,
        public date_of_approval?: number
    ) {}
}