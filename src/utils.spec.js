import * as fs from 'fs'
import { padNumber, stripTrailingSlash, getLastFolder, isValidFolder } from './utils'

describe('padNumber', () => {
  test('should pad single digit numbers', () => {
    expect(padNumber(1)).toBe('001');
    expect(padNumber(2)).toBe('002');
    expect(padNumber(9)).toBe('009');
  });

  test('should pad double digit numbers', () => {
    expect(padNumber(10)).toBe('010');
    expect(padNumber(20)).toBe('020');
    expect(padNumber(99)).toBe('099');
  });

  test('should not pad three digit numbers', () => {
    expect(padNumber(100)).toBe('100');
    expect(padNumber(999)).toBe('999');
  });

  test('should handle large numbers', () => {
    expect(padNumber(1000)).toBe('1000');
    expect(padNumber(10000)).toBe('10000');
  });
});

describe('stripTrailingSlash', () => {
  test('should strip trailing slashes from filepath', () => {
    expect(stripTrailingSlash('/path/to/folder/')).toBe('/path/to/folder');
    expect(stripTrailingSlash('\\path\\to\\folder\\')).toBe('\\path\\to\\folder');
    expect(stripTrailingSlash('path/to/folder/')).toBe('path/to/folder');
    expect(stripTrailingSlash('path\\to\\folder\\')).toBe('path\\to\\folder');
  });

  test('should return the same filepath if no trailing slashes', () => {
    expect(stripTrailingSlash('/path/to/folder')).toBe('/path/to/folder');
    expect(stripTrailingSlash('\\path\\to\\folder')).toBe('\\path\\to\\folder');
    expect(stripTrailingSlash('path/to/folder')).toBe('path/to/folder');
    expect(stripTrailingSlash('path\\to\\folder')).toBe('path\\to\\folder');
  });
});

describe('getLastFolder', () => {
  test('should return last folder name for Windows path', () => {
    expect(getLastFolder('C:\\SecretFolder\\AnotherSecret\\Marcus', '\\')).toBe('Marcus');
  });

  test('should return last folder name for MacOS/Linux path', () => {
    expect(getLastFolder('./CoolDirectory/Sanatan', '/')).toBe('Sanatan');
  });

  test('should return last folder name for a path with multiple subdirectories', () => {
    expect(getLastFolder('./CoolDirectory/Sanatan/subdir1/subdir2', '/')).toBe('subdir2');
  });

  test('should return last folder name for a path with only one subdirectory', () => {
    expect(getLastFolder('./CoolDirectory', '/')).toBe('CoolDirectory');
  });
});

describe('isValidFolder', () => {
  test('should return true for a valid folder', () => {
    const testFolder = `testfolder`;
    fs.mkdirSync(testFolder);
    expect(isValidFolder(testFolder)).toBe(true);
    fs.rmdirSync(testFolder);
  });

  test('should return false for a file', () => {
    const testFile = `testfile`;
    fs.writeFileSync(testFile, 'Test');
    expect(isValidFolder(testFile)).toBe(false);
    fs.unlinkSync(testFile);
  });

  test('should return false for an invalid folder', () => {
    expect(isValidFolder('./invalidfolder')).toBe(false);
  });

  test('should return false for an empty string', () => {
    expect(isValidFolder('')).toBe(false);
  });
});
