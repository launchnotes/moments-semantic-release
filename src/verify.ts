import { Context } from "semantic-release";
const SemanticReleaseError = require('@semantic-release/error');

module.exports = async (pluginConfig: PluginConfiguration, context: Context) => {
  const errors: string[] = [];
  const { logger: { log }, env } = context;
  const { projectId } = pluginConfig;

  if (!projectId) {
    errors.push('LaunchNotes `projectId` is required');
    throw new SemanticReleaseError(
      'No LaunchNotes projectId.',
      'ENOLAUNCHNOTESPROJECTID',
      `A LaunchNotes projectId must be passed via the pluginConfig.`
    )
  }

  if (!env.LAUNCHNOTES_API_KEY) {
    throw new SemanticReleaseError(
      'No LaunchNotes API Key.',
      'ENOLAUNCHNOTESAPIKEY',
      `A LaunchNotes API Key must be created and passed as an environment variable on your CI environment.`
    )
  }

  if (errors.length > 0) {
    log('LaunchNotes configured correctly!');
  }
}
