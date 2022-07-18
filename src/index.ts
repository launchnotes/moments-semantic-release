const postMoments = require('./postMoments');
const verify = require('./verify');
import { Context } from "semantic-release";

let verified:boolean;

async function verifyConditions(pluginConfig: PluginConfiguration, context: Context) {
  await verify(pluginConfig, context);
  verified = true;
}

async function success(pluginConfig: PluginConfiguration, context: Context) {
  if (!verified) {
    await verify(pluginConfig, context);
    verified = true;
  }

  return postMoments(pluginConfig, context);
}

/**
 * Called by semantic-release during the verification step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
*/

module.exports = {
  success,
  verifyConditions
}
