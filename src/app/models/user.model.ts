import { TransactionDTO } from "../DTOs/createTransaction.dto";

export class UserModel {
    constructor(
        public user: {
            id: number,
            password: string,
            username: string,
            is_active: boolean,
            is_phone_number_verifyed: boolean,
            full_name: string,
            phone_number: string,
            national_code: string,
            from_city: string,
            amount_of_capital: string,
            familiarity_with_digital_currencies: string,
            get_to_know_us: string,
            is_receive_signal_notifications: boolean,
            is_receive_news_notifications: boolean,
            date_of_birth?: Date,
            father_name?: string,
            place_of_issue?: string,
            id_card?: File,
            face?: File
        },
        public transaction: TransactionDTO,
        public unread_messages?: number
        ) { }
}