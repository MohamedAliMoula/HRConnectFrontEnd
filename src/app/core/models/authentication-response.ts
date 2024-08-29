export interface AuthenticationResponse {
  accessToken?: string;
  mfaEnabled?: string;
  secretImageUri?: string;
  role?: string;
  firstName?:string;
  blocking?: boolean;
}
