import { createMocks } from 'node-mocks-http'
import type { ApiResponse, MediaItem } from '../../models/itunes'


jest.mock('../../api/itunes', () => ({
  searchItunes: jest.fn(),
}))

import handler from '../../api/search'
import { searchItunes } from '../../api/itunes'

describe('GET /api/search', () => {
  const fakeData: ApiResponse<MediaItem> = {
    resultCount: 1,
    results: [{
      trackId: 1,
      collectionId: 2,
      artworkUrl100: 'url.jpg',
      collectionName: 'Album X',
      artistName: 'Artist Y',
      collectionPrice: 5.99,
      currency: 'USD'
    }]
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('retorna 200 y datos cuando el cliente responde correctamente', async () => {
    ;(searchItunes as jest.Mock).mockResolvedValueOnce(fakeData)

    const { req, res } = createMocks({
      method: 'GET',
      query: { term: 'Test', media: 'music' }
    })
    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const json = JSON.parse(res._getData())
    expect(json).toEqual(fakeData)
  })

  it('retorna 500 cuando searchItunes lanza error', async () => {
    ;(searchItunes as jest.Mock).mockRejectedValueOnce(new Error('Boom'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { term: 'Fail' }
    })
    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Boom' })
  })

  it('retorna 405 si el método no es GET', async () => {
    const { req, res } = createMocks({ method: 'POST' })
    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Only GET allowed' })
  })

  it('retorna 400 si query params son inválidos', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { term: ['a'], media: 'all' }
    })
    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Invalid query parameters' })
  })
})
