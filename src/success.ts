import { Context } from 'semantic-release';
import { MomentsApi, Configuration } from '@launchnotes/moments-api-client';

/**
 * Post a list of commits to the /moments endpoint
 *
 * @param {Object} pluginConfig The plugin configuration.
 * @param {String} pluginConfig.projectId The ID of the corresponding project.
 * @param {Object} context The semantic-release context.
 * @param {Array<Object>} context.commits The commits to analyze.
 * @param {Object} context.lastRelease The last release with `gitHead` corresponding to the commit hash used to make the last release and `gitTag` corresponding to the git tag associated with `gitHead`.
 * @param {Object} context.nextRelease The next release with `gitHead` corresponding to the commit hash used to make the  release, the release `version` and `gitTag` corresponding to the git tag associated with `gitHead`.
 * @param {Object} context.options.repositoryUrl The git repository URL.
 *
 * @returns {String} The changelog for all the commits in `context.commits`.
*/

const success = (pluginConfig: PluginConfiguration, context: Context) => {
  const {
    commits,
    env,
    logger,
  } = context;
  const apiToken = env.LAUNCHNOTES_API_KEY;
  const config = new Configuration({apiKey: apiToken});
  const api = new MomentsApi(config);

  const {
    projectId,
  } = pluginConfig;

  const commitPayload = commits?.map((commit) => {
    return commit;
  });

  try {
    const response = api.postMoments({
      schemaId: 'test.json',
      projectId: projectId,
      data: {
        commits: commitPayload
      },
    }).then((result: unknown) => {
      console.log(result);
      logger.log('Success');
    }).catch((error: unknown) => {
      console.log(error);
      logger.error('There was an error', error);
    });
  } catch (error) {
    logger.error('There was an error', error);
  }
}

export default success;
