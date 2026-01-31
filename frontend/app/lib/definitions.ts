
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UpFile = {
  id: number;
  filename: string;
  original_name: string;
  size: number;
  created_at: string;
  content: string;
  status: string;
  user_id: number;
  url: string;
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

