export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class InvalidCredentialsError extends AuthenticationError {
  constructor() {
    super("Invalid email or password");
  }
}

export class UserExistsError extends AuthenticationError {
  constructor() {
    super("User with this email already exists");
  }
}
