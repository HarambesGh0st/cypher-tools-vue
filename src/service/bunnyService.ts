import BunnyStream from '@/utils/BunnyStream'

const apiKey = import.meta.env.BUNNY_API_KEY
const libraryId = '402767'

const bunnyStream = new BunnyStream(libraryId)

export default bunnyStream
