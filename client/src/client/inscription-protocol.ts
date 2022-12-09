
export declare module Inscription {
    export interface UserDialogData {
        displayName: string;
        description: string;
        documents: Document[];
        tags: string[];
    }

    export interface Document {
        description: string;
        url: string;
    }
}


export declare module InscriptionProtocol {
    export type InitializeRequestArguments = void;
    export type InitializeRequestResponse = boolean;

    export type UserDialogArguments = { dialogId: number; }
    export type UserDialogResponse = Inscription.UserDialogData;
}

export interface InscriptionRequestTypes {
    'initialize': [InscriptionProtocol.InitializeRequestArguments, InscriptionProtocol.InitializeRequestResponse];
    'userDialog': [InscriptionProtocol.UserDialogArguments, InscriptionProtocol.UserDialogResponse];
}

export interface InscriptionNotificationTypes {
    'userDialogChanged': Inscription.UserDialogData;
}
