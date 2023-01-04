import CanIUseFetchService from "../services/caniuseFetchService";

describe('Scraper tests', () => {
    test('successfully displays feature support', async () => {
    const data = await CanIUseFetchService.getData('es6');
    expect(data.length).toBeGreaterThan(1000);
  });

  test('returns an empty string when feature does not exist', async () => {
    const data = await CanIUseFetchService.getData('zombies');
    expect(data).toEqual('');
  });

  test('succesfully limits feature support table', async () => {
    const fullData = await CanIUseFetchService.getData('es6');
    const limitedData = await CanIUseFetchService.getData('es6', 3);
    expect(fullData.length).toBeGreaterThan(limitedData.length);
  });

});