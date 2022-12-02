export enum MessageSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface Message {
  field: string;
  severity: MessageSeverity;
  message: string;
}

export class MessageUtil {
  public static findMessage(messages: Message[], field: string): Message | undefined {
    return messages.find(message => message.field === field);
  }
}
