import { validateUserName } from 'tasks/task1/index';
import { fetchIsUserNameAvailable } from 'tasks/task1/fetchIsUserNameValid';

jest.mock('task1/fetchIsUserNameValid');

describe('task1', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each(['', 'a', 'ab'])('should return false if user name has length less than 3 symbols [%s]', (userName) => {
    const mock = jest.mocked(fetchIsUserNameAvailable);
    const actual = validateUserName(userName);

    expect(actual).resolves.toBe(false);
    expect(mock).not.toHaveBeenCalled();
  });

  it('should return false if user name contains spaces', () => {
    const mock = jest.mocked(fetchIsUserNameAvailable);
    const userName = 'jakub wierzchowiec 123';

    const actual = validateUserName(userName);

    expect(actual).resolves.toBe(false);
    expect(mock).not.toHaveBeenCalled();
  });

  it.each(Array.from({ length: 10 }, (_, i) => i))('should return false if user name starts with a number [%s]', (n) => {
    const mock = jest.mocked(fetchIsUserNameAvailable);
    const userName = `${n}jakub123`;

    const actual = validateUserName(userName);

    expect(actual).resolves.toBe(false);
    expect(mock).not.toHaveBeenCalled();
  });

  it('should return false if user name is valid but unavailable', () => {
    const mock = jest.mocked(fetchIsUserNameAvailable).mockResolvedValue(false);
    const userName = 'jakub123';

    const actual = validateUserName('jakub123');

    expect(actual).resolves.toBe(false);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should return true if user name is valid and available', () => {
    const mock = jest.mocked(fetchIsUserNameAvailable).mockResolvedValue(true);
    const userName = 'jakub123';

    const actual = validateUserName('jakub123');

    expect(actual).resolves.toBe(true);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should return false if user name avaiability check fails', () => {
    const mock = jest.mocked(fetchIsUserNameAvailable).mockRejectedValue(null);
    const userName = 'jakub123';

    const actual = validateUserName('jakub123');

    expect(actual).resolves.toBe(false);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});