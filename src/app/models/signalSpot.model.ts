export class SignalSpotModel {
    constructor(
        public id: number,
        public targets: {id: number, title: string, amount: number, is_touched: boolean}[],
        public signal_news: {id: number, content: string}[],
        public coin_symbol: string,
        public proposed_capital: number,
        public r_and_r: number,
        public type_of_investment: 'کوتاه مدت' | 'بلند مدت',
        public stop_loss: number,
        public entry: number,
        public is_touched_entry: boolean,
        public status: string,
        public is_active: boolean,
        public profit_of_signal_amount?: number,      
        public alarms?: {id: number, title: string}[]
    ) { }
}