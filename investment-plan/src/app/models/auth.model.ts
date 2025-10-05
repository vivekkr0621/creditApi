export interface LoginRequest {
  userId: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
}