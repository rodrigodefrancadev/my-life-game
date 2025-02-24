const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'my-life-game-data-connect',
  location: 'southamerica-east1'
};
exports.connectorConfig = connectorConfig;

function createMyUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyUser', inputVars);
}
exports.createMyUserRef = createMyUserRef;

exports.createMyUser = function createMyUser(dcOrVars, vars) {
  return executeMutation(createMyUserRef(dcOrVars, vars));
};

function getMyUserRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyUser');
}
exports.getMyUserRef = getMyUserRef;

exports.getMyUser = function getMyUser(dc) {
  return executeQuery(getMyUserRef(dc));
};

