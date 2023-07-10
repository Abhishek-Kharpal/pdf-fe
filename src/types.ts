export interface SnackbarI {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  duration: number;
}

export interface FileI {
  id: string;
  url: string;
  name: string;
  author: string;
  authorId: string;
  comments: CommentI[];
  createdAt: Date;
  size: number;
}

export interface CommentI {
  id: string;
  description: string;
  author: string;
  authorId: string;
  createdAt: Date;
}

export interface RegisterModalI {
  open: boolean;
  handleClose: (open) => {};
}

export interface AuthContextI {
  user: string | null;
  setUser: (user: string) => void;
}
