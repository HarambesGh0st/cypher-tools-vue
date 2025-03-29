import BunnyStream from '@/utils/BunnyStream'

const apiKey = import.meta.env.BUNNY_API_KEY
const libraryId = 'YOUR_LIBRARY_ID'

const bunnyStream = new BunnyStream(apiKey, libraryId)

export default bunnyStream
