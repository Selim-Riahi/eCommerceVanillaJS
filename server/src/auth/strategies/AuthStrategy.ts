export interface AuthStrategy {
  authenticate(args: any): Promise<{ user: any; token?: string }>;
  register?(args: any): Promise<{ user: any; token?: string }>;
}
