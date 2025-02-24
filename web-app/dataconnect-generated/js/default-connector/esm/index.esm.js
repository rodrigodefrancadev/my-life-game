import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';


export const connectorConfig = {
  connector: 'default',
  service: 'my-life-game-data-connect',
  location: 'southamerica-east1'
};

export function createMyUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyUser', inputVars);
}

export function createMyUser(dcOrVars, vars) {
  return executeMutation(createMyUserRef(dcOrVars, vars));
}

export function getMyUserRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyUser');
}

export function getMyUser(dc) {
  return executeQuery(getMyUserRef(dc));
}
