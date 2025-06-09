import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useSearch } from '../../hooks/useSearch'
import type { MediaItem, ApiResponse } from '../../models/itunes'

describe('useSearch', () => {
  const fakeResponse: ApiResponse<MediaItem> = {
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

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('inicialmente devuelve vacío si term está vacío', () => {
    const { result } = renderHook(() => useSearch({ term: '', media: 'all' }))
    expect(result.current.results).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('hace fetch y actualiza resultados cuando term no está vacío', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => fakeResponse
    })

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearch({ term: 'test', media: 'music' })
    )

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.results).toEqual(fakeResponse.results)
    expect(global.fetch).toHaveBeenCalledWith('/api/search?term=test&media=music')
  })

  it('marca isError en true si fetch falla', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('fail'))

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearch({ term: 'fail', media: 'all' })
    )
    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.isError).toBe(true)
    expect(result.current.results).toEqual([])
  })
})
