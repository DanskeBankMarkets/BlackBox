'use strict';

import path from 'path';
import fs from 'fs';
import Q from 'q';

const DATA_DIRECTORY = path.join(__dirname, 'data');

function getFilelist() {
 return Q.nfcall(fs.readdir, DATA_DIRECTORY).then(function (filenames) {
  return filenames.filter(function (filename) {
   return filename.substr(-5) === '.json';
  });
 });
}

function getFileData(filenames) {
 var filedata = [];

 filenames.forEach(function (filename) {
  filedata.push(Q.nfcall(fs.readFile, path.join(DATA_DIRECTORY, filename), 'utf8'));
 });

 return Q.all(filedata);
}

function parseFileData(files) {
 var jsonObjects = [];

 files.forEach(function (file) {
  try {
   jsonObjects.push(JSON.parse(file));
  } catch (e) {
   console.error('unable to parse file as json', e);
  }
 });

 return jsonObjects;
}

export default {
 load: function () {
  return getFilelist()
   .then(getFileData)
   .then(parseFileData);
 }
};
