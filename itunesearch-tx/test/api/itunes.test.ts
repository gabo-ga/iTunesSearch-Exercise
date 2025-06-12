// tests/api/itunes.test.ts
import axios from 'axios';
import { searchItunes } from '../../api/itunes';
import type { ApiResponse, MediaItem } from '../../models/itunes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('searchItunes', () => {
  const fakeResponse: ApiResponse<MediaItem> = {
    resultCount: 1,
    results: [{
      trackId: 123,
      collectionId: 456,
      artworkUrl100: 'https://image.jpg',
      trackName: 'Test Track',
      artistName: 'Test Artist',
      collectionPrice: 9.99,
      currency: 'USD'
    }]
  };

  it('debe devolver datos cuando la API responde 200', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: fakeResponse,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
          url: ''
      }
    });
    const data = await searchItunes({ term: 'test', media: 'music' });
    expect(data).toEqual(fakeResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('term=test'),
    );
  });

  it('debe lanzar un error cuando Axios falla', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
    await expect(searchItunes({ term: 'fail' })).rejects.toThrow('Network Error');
  });
});
