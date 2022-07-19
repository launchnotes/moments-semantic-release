# Moments Semantic Release

A [semantic-release](https://github.com/semantic-release/semantic-release)
plugin that allows you to publish Moments via the
[Moments API client](https://github.com/launchnotes/moments-api-client).

- [Moments Semantic Release](#moments-semantic-release)
  - [Summary](#summary)
  - [Installing the package](#installing-the-package)
  - [Using the plugin](#using-the-plugin)
  - [Resources](#resources)

## Summary

This allows you automate publishing release data payloads to the Moments API
client. The commits in your repository will first be parsed, analyzed, and
formatted accordingly. A POST request will then be triggered by the
`moments-api-client` in attempt to persist a Moment.

## Installing the package

```sh
# via npm
npm install -g semantic-release @launchnotes/moments-semantic-release
```

```sh
# via yarn
yarn global add semantic-release @launchnotes/moments-semantic-release
```

## Using the plugin

You will first need to add `@launchnotes/moments-semantic-release` in the list
of `semantic-release` plugins in your `package.json`. The `projectId` will also
need to be defined for context.

```json
{
  "release": {
    "plugins": [
      [
        "moments-semantic-release",
        {
          "projectId": "pro_abc123"
        }
      ]
    ]
  }
}
```

You will then need to set the `LAUNCHNOTES_API_KEY` environment variable with
your `management` API key from the LaunchNotes application.

```sh
export LAUNCHNOTES_API_KEY=manage_abc123
```

Afterwards, you should be able to run `semantic-release`.

```sh
npx semantic-release
```

## Resources

This package uses other dependencies and tooling to work. Check out the
following for more information.

- [semantic-release](https://github.com/semantic-release/semantic-release): handles parsing and formatting of release
- [moments-api-client](https://github.com/launchnotes/moments-api-client): allows you to interface with the Moments API client

