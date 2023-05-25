import { PID } from './inscription';

export interface Action {
  kind: string;
  pid: PID;
  payload: string;
}
