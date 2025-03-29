class BunnyStream {
  private apiKey: string
  private libraryId: string
  private libraryApiKey: string
  private baseUrl: string = 'https://video.bunnycdn.com/library'

  constructor(libraryId: string) {
    this.apiKey = import.meta.env.VITE_BUNNY_API_KEY
    this.libraryId = libraryId
    this.libraryApiKey = import.meta.env.VITE_BUNNY_LIBRARY_API_KEY
  }

  private async request(url: string, options: RequestInit, accessKey: string): Promise<any> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          AccessKey: accessKey,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      throw new Error(`Request failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  async addLibrary(name: string): Promise<any> {
    return this.request(
      `${this.baseUrl}`,
      {
        method: 'POST',
        body: JSON.stringify({ name }),
      },
      this.apiKey,
    )
  }

  async getLibrary(libraryId: string): Promise<any> {
    return this.request(`${this.baseUrl}/${libraryId}`, { method: 'GET' }, this.libraryApiKey)
  }

  async listCollections(libraryId: string): Promise<any> {
    return this.request(
      `${this.baseUrl}/${libraryId}/collections`,
      { method: 'GET' },
      this.libraryApiKey,
    )
  }

  async addCollection(name: string): Promise<any> {
    return this.request(
      `${this.baseUrl}/${this.libraryId}/collections`,
      {
        method: 'POST',
        body: JSON.stringify({ name }),
      },
      this.libraryApiKey,
    )
  }

  async getCollection(collectionId: string): Promise<any> {
    return this.request(
      `${this.baseUrl}/${this.libraryId}/collections/${collectionId}`,
      {
        method: 'GET',
      },
      this.libraryApiKey,
    )
  }

  async uploadVideo(title: string, file: Buffer, fileName: string): Promise<any> {
    // Create video entry
    const createResponse = await this.request(
      `${this.baseUrl}/${this.libraryId}/videos`,
      {
        method: 'POST',
        body: JSON.stringify({ title }),
      },
      this.libraryApiKey,
    )
    const videoId = createResponse.guid

    // Upload video
    const uploadUrl = `${this.baseUrl}/${this.libraryId}/videos/${videoId}`
    await this.request(
      uploadUrl,
      {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': 'application/octet-stream' },
      },
      this.libraryApiKey,
    )

    return { videoId, message: 'Upload successful' }
  }

  async getVideo(videoId: string): Promise<any> {
    return this.request(
      `${this.baseUrl}/${this.libraryId}/videos/${videoId}`,
      { method: 'GET' },
      this.libraryApiKey,
    )
  }

  async deleteVideo(videoId: string): Promise<any> {
    await this.request(
      `${this.baseUrl}/${this.libraryId}/videos/${videoId}`,
      { method: 'DELETE' },
      this.libraryApiKey,
    )
    return { message: 'Video deleted successfully' }
  }
}

export default BunnyStream
