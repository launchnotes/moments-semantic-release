import { Context } from "semantic-release";
import AggregateError from 'aggregate-error';

module.exports = async (pluginConfig: PluginConfiguration, context: Context) => {
  const errors: string[] = [];
  const { logger: { log }, env } = context;
  const { projectId } = pluginConfig;

  if (!projectId) {
    errors.push('LaunchNotes `projectId` is required');
  }

  if (typeof env.LAUNCHNOTES_API_KEY === "string") {
    errors.push(`
      environment variable 'LAUNCHNOTES_API_KEY' is required. Please create a
      management key and pass it as an environment variable when calling
      semantic release
    `);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  } else {
    log('LaunchNotes configured correctly!');
  }
}
