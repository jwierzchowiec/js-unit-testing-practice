import { getUtcStringDate } from 'tasks/task3';
import { setupMockDate, MockDateSetup } from './testUtils';
import timezonedDate from "timezoned-date";

describe('task3', () => {
  let mockDate: MockDateSetup;

  // possible time zones range from UTC-12:00 to UTC+14:00
  const TIME_ZONES = Array.from({ length: 27 }, (_, i) => i - 12);

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  it.each(TIME_ZONES)('should utilise passed date [UTC %d:00]', (timeZone) => {
    const dateConstructor = timezonedDate.makeConstructor(60 * timeZone);
    const hour = 15;
    const timeStampInTimeZone = new dateConstructor(2026, 0, 30, hour, 34, 0);

    const actual = getUtcStringDate(timeStampInTimeZone);
    
    const offset = hour - timeZone;
    const expectedDay = offset > 23 ? '31' : '30';
    const expectedHour = `${offset%24}`.padStart(2, '0');
    expect(actual).toBe(`2026-01-${expectedDay}T${expectedHour}:34:00.000Z`);
  });

  

  it.each(TIME_ZONES)('should utilise current system time if date not passed [UTC %d:00]', (timeZone) => {
    mockDate.set({isoDate: '2026-01-30T10:30:00.000Z', offset: timeZone * 60});

    const actual = getUtcStringDate();

    expect(actual).toBe('2026-01-30T10:30:00.000Z');
  });
});
