const rewireYarnWorkspaces = require('react-app-rewire-yarn-workspaces')
const rewireAliases = require('react-app-rewire-aliases')
const { paths } = require('react-app-rewired')
const path = require('path')

module.exports = function override(config, env) {
  return rewireYarnWorkspaces(config, env)
}
