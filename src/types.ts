export interface SnackbarI {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  duration: number;
}

export interface FileI {
  id: string;
  data: {
    type: string;
    data: ArrayBuffer;
  };
  name: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
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
  handleClose: () => void;
}

export interface AuthContextI {
  user: {
    id: string;
    name: string;
    email: string;
    files: FileI[];
    storage: number;
  };
  setUser: (user: string) => void;
}

export interface RegisterUserI {
  name: string;
  email: string;
  password: string;
}
