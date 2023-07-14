import { InscriptionValidation } from '@axonivy/inscription-protocol';

export type Message = Omit<InscriptionValidation, 'path'>;
