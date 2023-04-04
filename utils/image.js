import client from './client.js'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlForThumbnail (source) {
  return builder.image(source)
}

export { urlForThumbnail }