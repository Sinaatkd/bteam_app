import { environment } from './../../environments/environment';

export const BASE_URL = environment.production? 'https://bteamapp.iran.liara.run': 'http://127.0.0.1:8000';
export const BASE_API_URL = `${BASE_URL}/api-v2/`;
export const BASE_SOCKET_API_URL = environment.production? `wss://bteamapp.iran.liara.run/`: 'ws://127.0.0.1:8000/';