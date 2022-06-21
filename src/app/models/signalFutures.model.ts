export class SignalFuturesModel {
    constructor(
        public id: number,
        public targets: {id: number, title: string, amount: number, is_touched: boolean}[],
        public signal_news: {id: number, content: string, seen_by: any}[],
        public coin_symbol: string,
        public amount: number,
        public leverage: number,
        public type_of_investment: 'SHORT' | 'LONG',
        public stop_loss: number,
        public entry: number,
        public is_touched_entry: boolean,
        public is_active: boolean,
        public status: string,
        public profit_of_signal_amount?: number,
        public alarms?: {id: number, title: string}[],
    ) { }
}