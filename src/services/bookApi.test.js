import { checkResponseData } from './bookApi';

describe('Search Response', () => {

  it('Returns JSON if no error message', () => {
    const data = { totalItems: 3000 };
    const output = checkResponseData(data);
    expect(output).toBe(data);
  });

  it('Returns Error Message if response.error', () => {
    const data = { error: { message: 'Bad Query' } };
    expect(() => {
      checkResponseData(data);
    }).toThrow(data.error.message);
  });

});