import { getMyUserRef, connectorConfig } from '../../';
import { CallerSdkTypeEnum, validateArgs } from 'firebase/data-connect';
import { useDataConnectQuery } from '@tanstack-query-firebase/react/data-connect';


export function useGetMyUser(dc, options) {
  const { dc: dcInstance } = validateArgs(connectorConfig, dc, undefined, false);
  const ref = getMyUserRef(dcInstance);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}