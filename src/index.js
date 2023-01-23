#!/usr/bin/env node
import { parseArgs } from 'util'
import { spawnSync } from 'child_process'
import * as path from 'path'
import { getLastFolder, isValidFolder, renameFilesInFolder, stripTrailingSlash } from './utils.js'

const {
  values: { videoFormat },
  positionals,
} = parseArgs({
  allowPositionals: true,
  options: {
    videoFormat: {
      type: 'string',
      short: 'f',
      optional: true,
      default: 'mp4'
    },
  },
});

if (positionals.length === 0) {
  console.error('Missing folder with turntable images');
  process.exit(1);
}

if (positionals.length > 1) {
  console.error(`Unknown arguments ${positionals.slice(1)}. Only one positional argument is required, the path of the folder`);
  process.exit(2);
}

const folderPath = stripTrailingSlash(positionals[0]);
if (!isValidFolder(folderPath)) {
  console.error(`${folderPath} is not a valid folder path`);
  process.exit(3);
}

console.info('Renaming image files so ffmpeg can parse');
renameFilesInFolder(folderPath);
console.info(`Converting images to an ${videoFormat} video`);
const videoName = getLastFolder(folderPath);
const ffmpeg = spawnSync(
  'ffmpeg',
  [
    '-r',
    '30',
    '-s',
    '960x800',
    '-i',
    `"${folderPath}${path.sep}img%03d.png"`,
    '-codec:v',
    'mpeg4',
    '-flags:v',
    '+qscale',
    '-global_quality:v',
    '0',
    '-codec:a',
    'libmp3lame',
    `".${path.sep}${videoName}.${videoFormat}"`
  ],
  {
    encoding: 'utf-8',
    shell: true,
  }
);

if (ffmpeg.error) {
  console.error(ffmpeg.error);
  process.exit(4);
}

console.info(`Successfully created an ${videoFormat} video`);
