import minimist from 'minimist'
import { config } from 'dotenv'
import { Web3Storage, getFilesFromPath } from 'web3.storage'

config()

async function main () {
  const args = minimist(process.argv.slice(2))
  const token = process.env.WEB3STORAGE_TOKEN

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  if (args._.length < 1) {
    return console.error('Please supply the path to a file or directory')
  }

  const storage = new Web3Storage({ token })
  const files = []

  for (const path of args._) {
    const pathFiles = await getFilesFromPath(path)
    files.push(...pathFiles)
  }

  console.log(`Uploading ${files.length} files`)

  const cid = await storage.put(files)

  console.log('Content added with CID:', cid)
  console.log(`Find it at: https://${cid}.ipfs.dweb.link`)
}

main()
