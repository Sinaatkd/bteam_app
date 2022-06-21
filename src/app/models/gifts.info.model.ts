export class GiftsInfoModel {
    constructor (
        public red_b : {
            code: string
            all_card_count: number
            active_count: number
            deactive_count: number
        },
        public black_b : {
            code: string
            all_card_count: number
            active_count: number
            deactive_count: number
        },
        public blue_b : {
            code: string
            all_card_count: number
            active_count: number
            deactive_count: number
        },
        public invated_count: number,
        public buy_with_user_code: number,
        public wallet_amount: number,
        public user_code: number,
    ) {}
}