export interface AuthUser {
  uuid: string;
  userData: UserData | null;
}

export enum Sex {
  M = "M",
  F = "F",
}

export interface UserData {
  displayName: string;
  birthday: Date;
  sex: Sex;
}
