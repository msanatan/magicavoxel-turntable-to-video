import * as fs from 'fs'
import * as path from 'path'

export function renameFilesInFolder(folderPath) {
  // Get all filenames in the folder
  try {
    const files = fs.readdirSync(folderPath);
    // Rename each file with a numerical prefix
    files.forEach((file, index) => {
      const oldPath = `${folderPath}/${file}`;
      const newPath = `${folderPath}/img${padNumber(index)}.png`;
      fs.renameSync(oldPath, newPath);
    });
  } catch (err) {
    console.error(err);
  }
}

export function isValidFolder(folderPath) {
  try {
    const stats = fs.statSync(folderPath);
    return stats.isDirectory();
  } catch (error) {
    console.error(`Could not get folder details for ${folderPath}, ${error}`);
    return false;
  }
}

export function padNumber(number) {
  return number.toString().padStart(3, '0');
}

export function stripTrailingSlash(filepath) {
  return filepath.replace(/[/\\]+$/, "");
}

export function getLastFolder(filepath, pathSep = path.sep) {
  const folders = filepath.split(pathSep);
  return folders[folders.length - 1];
}
