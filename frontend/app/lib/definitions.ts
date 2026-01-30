
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UpFile = {
  id: number;
  filename: string;
  size: number;
  created: string;
  content: string;
  user_id: number;
};

export type State = {
  errors?: {
    filename?: string[];
    content?: string[];
  };
  message?: string | null;
};

export type UserFormSate = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword? : string[];
  };
  message?: string | null;
};

