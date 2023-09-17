import { Server } from "http";
import {Socket as IoClientSocketClass} from "socket.io-client";
import { Dictionary } from 'utility/dictionary';

export type ExpressApp = any; 

export type EventSocket = IoClientSocket;

// Define the type of the function to handle the event.
export type SocketServerEventHandlerDelegate<T> = (data: T, sender: EventSocket) => void;

// Define the type of the object that will hold the event name and the handler.
export interface SocketServerEventHandler<T> {
    name: string;
    handler: SocketServerEventHandlerDelegate<T>;
};

// Define the type of the event data
export type SocketServerEvent<T> = {
    name: string;
    data: T;
};

// Client Emitter types
export type SocketClientEmitterResultDelegate<S extends string> = <T>(eventName: S, data?: T) => void;
export type SocketClientEventEmitterResultDelegate = <T>(data?: T) => void;

export interface SocketClientEventEmitter<T> {
    emit(data?: T): SocketClientEventEmitterResultDelegate;
}

export interface SocketClientEmitter<S extends string> {
    emit<T>(eventName: S, data?: T): SocketClientEmitterResultDelegate<S>;
}

// Define the interface of base socket actor
export interface ISocketActor {
    Event<T>(name: string, handler: SocketServerEventHandlerDelegate<T>): SocketServerEventHandler<T>;
}

// Define the base socket actor
export abstract class SocketActor implements ISocketActor {
    public events: Dictionary<SocketServerEventHandler<any>> = {};

    public Event<T>(name: string, handler: SocketServerEventHandlerDelegate<T>) {
        this.events[name] = {
            name,
            handler
        };

        return <SocketServerEventHandler<T>>this.events[name];
    }
}



export type HttpServer = Server;

export type IoClientSocket = IoClientSocketClass;

// Define the interface of socket client
export interface ISocketClient extends ISocketActor {
    Emitter<S extends string>(...params: S[]): SocketClientEmitter<S>;
    EventEmitter<T>(eventName: string): SocketClientEventEmitter<T>;
    onClose: () => void;
    onError: (err: Error) => void;
    onEmit: <T>(event: SocketServerEvent<T>) => void;
}