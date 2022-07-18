const assert = require('assert')
const { get } = require('https')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const { getBaseConfig, getContext } = require('./testUtils')
const { success } = require('../src/success.ts')

//process.env.LAUNCHNOTES_API_KEY = 'testkey'

let postMomentsStub

describe('test success', () => {
  it('should handle defaults', async () => {
    const packageName = 'Internal Test'
    const expectedKeys = ['blocks', 'text', 'attachments']

    await success(getBaseConfig(packageName), getContext())

    const result = postMomentsStub.getCall(0).args[0]
    assert.deepStrictEqual(Object.keys(result), expectedKeys)
    assert.strictEqual(
      result.text,
      `A new version of ${packageName} has been released!`
    )
  })

  it('should handle onSuccessTemplate', async () => {
    const packageName = 'Internal Test'
    const text = 'Released!'
    const expectedResult = { text }
    const pluginConfig = getBaseConfig(packageName)

    pluginConfig.onSuccessTemplate = expectedResult

    await success(pluginConfig, getContext())

    const actualResult = postMessageStub.getCall(0).args[0]
    assert.deepStrictEqual(actualResult, expectedResult)
  })
})
