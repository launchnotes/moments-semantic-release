import { Context } from 'semantic-release';
import { MomentsApi, PostMomentsRequest } from '@launchnotes/moments-api-client';
import { Configuration } from '@launchnotes/moments-api-client/dist';

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
  const { projectId } = pluginConfig;
  const {
    nextRelease,
    commits,
    env,
    logger,
  } = context;

  const apiToken = env.LAUNCHNOTES_API_KEY;
  const config = new Configuration({
    accessToken: apiToken,
    // TODO Revisit where to derive the basePath and what values to use
    basePath: 'https://app.launchnotes.local:8080',
  });

  const api = new MomentsApi(config);
  const request: PostMomentsRequest = {
    schemaId: 'https://schema.launchnotes.dev/schemas/deploy.json',
    projectId: projectId,
    data: {
      version: nextRelease?.version,
      commits: commits?.map((commit) => {
        return {
          hash: commit.hash,
          datetime: commit.committerDate,
          message: commit.subject,
          author: {
            name: commit.author.name,
            email: commit.author.email,
          },
        }
      }),
    },
  };

  api.postMoments(request).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
}

export default success;
