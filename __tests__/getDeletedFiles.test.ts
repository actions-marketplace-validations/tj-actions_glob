import * as path from 'path'
import {getDeletedFiles} from '../src/utils'

const {GITHUB_WORKSPACE} = process.env
const topLevelDir = `${GITHUB_WORKSPACE}${path.sep}`

describe('getDeletedFiles test', () => {
  const filePatterns = [
    '*.md',
    '**.yaml',
    '**/rebase.yml',
    '!**.yml',
    '*.sh'
  ].join('\n')

  it('returns all deleted fileNames', async () => {
    const deletedFiles = await getDeletedFiles({
      filePatterns,
      baseSha: '99561ef',
      sha: '2eb2427',
      cwd: GITHUB_WORKSPACE!,
      diff: '...'
    })

    expect(deletedFiles).toContain(path.join(topLevelDir, 'entrypoint.sh'))
  })
})
