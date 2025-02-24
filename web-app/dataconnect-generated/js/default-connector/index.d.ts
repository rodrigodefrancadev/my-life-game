import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface CreateMyUserData {
  user_insert: User_Key;
}

export interface CreateMyUserVariables {
  displayName: string;
  birthday: DateString;
  sex: string;
}

export interface GetMyUserData {
  user?: {
    id: string;
    displayName: string;
    birthday: DateString;
    sex: string;
  } & User_Key;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}


/* Allow users to create refs without passing in DataConnect */
export function createMyUserRef(vars: CreateMyUserVariables): (MutationRef<CreateMyUserData, CreateMyUserVariables> & { __angular?: false });
/* Allow users to pass in custom DataConnect instances */
export function createMyUserRef(dc: DataConnect, vars: CreateMyUserVariables): (MutationRef<CreateMyUserData, CreateMyUserVariables> & { __angular?: false });

export function createMyUser(vars: CreateMyUserVariables): MutationPromise<CreateMyUserData, CreateMyUserVariables>;
export function createMyUser(dc: DataConnect, vars: CreateMyUserVariables): MutationPromise<CreateMyUserData, CreateMyUserVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getMyUserRef(): (QueryRef<GetMyUserData, undefined> & { __angular?: false });
/* Allow users to pass in custom DataConnect instances */
export function getMyUserRef(dc: DataConnect): (QueryRef<GetMyUserData, undefined> & { __angular?: false });

export function getMyUser(): QueryPromise<GetMyUserData, undefined>;
export function getMyUser(dc: DataConnect): QueryPromise<GetMyUserData, undefined>;

