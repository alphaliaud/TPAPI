import Album from './models/album'

async function run() {
  const album = await Album.findById(1, ['user', 'photos'])
  console.log(album)
  debugger
}

run().catch((err) => {
  console.error(err)
})