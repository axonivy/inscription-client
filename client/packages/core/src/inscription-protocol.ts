import { UserDialogData } from './inscription-model';

export declare module InscriptionProtocol {
  export type InitializeRequestArguments = void;
  export type InitializeRequestResponse = boolean;

  export type UserDialogArguments = { dialogId: number };
  export type UserDialogResponse = UserDialogData;
}

export interface InscriptionRequestTypes {
  initialize: [InscriptionProtocol.InitializeRequestArguments, InscriptionProtocol.InitializeRequestResponse];
  userDialog: [InscriptionProtocol.UserDialogArguments, InscriptionProtocol.UserDialogResponse];
}

export interface InscriptionNotificationTypes {
  userDialogChanged: UserDialogData;
}
