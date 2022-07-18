const getBaseConfig = packageName => {
  return {
    projectId: "pro_1234",
    packageName
  }
}

const getContext = (branchName = 'master') => {
  const version = '1.0.0'
  return {
    logger: console,
    nextRelease: {
      version,
      gitTag: `v${version}`,
      notes: 'hello'
    },
    commits: [
      {
        author: {
          name: "Test Developer",
          email: "test@example.com",
        },
        subject: "feat: add a new feature",
        hash: "askdjfoweei23093tiwi",
        message: "feat: This is the formatted message",
        committerDate: new Date().toString(),
      }
    ],
    options: {
      repositoryUrl:
        'git+https://github.com/juliuscc/semantic-release-slack-bot.git'
    },
    env: {
      npm_package_name: 'internal test',
      LAUNCHNOTES_API_KEY: 'test_key_123',
    },
    errors: ['Something went horribly wrong'],
    branch: {
      name: branchName
    }
  }
}

module.exports = {
  getBaseConfig,
  getContext
}
