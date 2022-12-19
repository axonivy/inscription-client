export interface InscriptionValidation {
  path: string;
  severtiy: 'error' | 'warning' | 'info';
  message: string;
}
