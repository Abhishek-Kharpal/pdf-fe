export interface SnackbarI {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  duration: number;
}
