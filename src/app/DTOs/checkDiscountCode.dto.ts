export class CheckDiscountCodeDTO {
    constructor(
        public code: string,
        public new_amount: number,
        public discount_code_id: number
    ) {
        
    }
}