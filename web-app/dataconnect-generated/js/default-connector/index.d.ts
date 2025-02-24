import { ConnectorConfig, DataConnect, QueryRef, QueryPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface GetMyUserData {
  user?: {
    id: string;
    displayName: string;
    birthday: DateString;
    email: string;
  } & User_Key;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}


/* Allow users to create refs without passing in DataConnect */
export function getMyUserRef(): (QueryRef<GetMyUserData, undefined> & { __angular?: false });
/* Allow users to pass in custom DataConnect instances */
export function getMyUserRef(dc: DataConnect): (QueryRef<GetMyUserData, undefined> & { __angular?: false });

export function getMyUser(): QueryPromise<GetMyUserData, undefined>;
export function getMyUser(dc: DataConnect): QueryPromise<GetMyUserData, undefined>;

