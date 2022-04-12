import { IBroadcastMessage } from '../interfaces/broadcast-message.interface';

export class BroadcastMessage implements IBroadcastMessage {
    constructor(
        public action: string,
        public data?: any
    ) {  }
}

