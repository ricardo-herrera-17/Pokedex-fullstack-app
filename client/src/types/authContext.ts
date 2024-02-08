export type LoginType = {
  email: string;
  password: string;
};

export interface AuthContextData {
  signed: boolean;
  user: string | null;
  loading: boolean;
  Login: ({}: LoginType) => Promise<void>;
  Logout: () => void;
}
