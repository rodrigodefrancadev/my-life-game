import { GetMyUserData} from '../';
import { useDataConnectQueryOptions, FlattenedQueryResult} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useGetMyUser(options?: useDataConnectQueryOptions<GetMyUserData>): UseQueryResult<FlattenedQueryResult<GetMyUserData, undefined>, FirebaseError>;
export function useGetMyUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyUserData>): UseQueryResult<FlattenedQueryResult<GetMyUserData, undefined>, FirebaseError>;
