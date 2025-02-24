const { queryRef, executeQuery, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'my-life-game-data-connect',
  location: 'southamerica-east1'
};
exports.connectorConfig = connectorConfig;

function getMyUserRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyUser');
}
exports.getMyUserRef = getMyUserRef;

exports.getMyUser = function getMyUser(dc) {
  return executeQuery(getMyUserRef(dc));
};

