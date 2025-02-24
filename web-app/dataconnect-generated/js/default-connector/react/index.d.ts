import { CreateMyUserData, CreateMyUserVariables, GetMyUserData} from '../';
import { useDataConnectQueryOptions, FlattenedQueryResult, useDataConnectMutationOptions, FlattenedMutationResult} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateMyUser(options?: useDataConnectMutationOptions<CreateMyUserData, CreateMyUserVariables>): UseMutationResult<FlattenedMutationResult<CreateMyUserData, CreateMyUserVariables>, FirebaseError, CreateMyUserVariables>;
export function useCreateMyUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMyUserData, CreateMyUserVariables>): UseMutationResult<FlattenedMutationResult<CreateMyUserData, CreateMyUserVariables>, FirebaseError, CreateMyUserVariables>;

export function useGetMyUser(options?: useDataConnectQueryOptions<GetMyUserData>): UseQueryResult<FlattenedQueryResult<GetMyUserData, undefined>, FirebaseError>;
export function useGetMyUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyUserData>): UseQueryResult<FlattenedQueryResult<GetMyUserData, undefined>, FirebaseError>;
