import { queryRef, executeQuery, validateArgs } from 'firebase/data-connect';


export const connectorConfig = {
  connector: 'default',
  service: 'my-life-game-data-connect',
  location: 'southamerica-east1'
};

export function getMyUserRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyUser');
}

export function getMyUser(dc) {
  return executeQuery(getMyUserRef(dc));
}
