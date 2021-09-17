module.exports = {
  token: 'ODIxMjEyMTUzMDc1MDczMDU0.YFAbag.m4yniwjcBKMU640TsAvRpCDA66A',
  prefix: ';',
  mongodburi: 'mongodb://localhost:27017/databaseName',
  database: 'databaseName',
  collection: {
    userdata: 'userdata',
    islandinfo: 'islandinfo',
    ban: 'ban',
    mute: 'mute',
    warn: 'warn',
    modstats: 'modstats',
    config: 'config',
    reactrole: 'reactrole',
  },
  errorMessage: {
    permission: 'You do not have permission to run this command.',
    notMember: "User doesn't exist!",
    noBotPermission: 'I don\'t have the permissions to run this command.',
    noReason: 'Please indicate the reason',
    noTime: 'Please indicate the time',
  },
};
