import { SocketClient } from './client';
import {createClient as _createClient} from './client/functions';

export function createClient(host: string, connected: () => void) {
    return _createClient(host, connected);
}

export {
    SocketClient,
}