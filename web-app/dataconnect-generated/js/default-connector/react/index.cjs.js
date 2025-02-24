const { getMyUserRef, connectorConfig } = require('../');
const { CallerSdkTypeEnum, validateArgs } = require('firebase/data-connect');
const { useDataConnectQuery } = require('@tanstack-query-firebase/react/data-connect');



exports.useGetMyUser = function useGetMyUser(dc, options) {
  const { dc: dcInstance } = validateArgs(connectorConfig, dc, undefined, false);
  const ref = getMyUserRef(dcInstance);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}