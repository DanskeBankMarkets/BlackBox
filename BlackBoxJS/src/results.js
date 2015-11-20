'use strict';

import path from 'path';
import fs from 'fs';
import Q from 'q';
import mkdirp from 'mkdirp';

/*
* Format:
* Path: ../results/<Ticker>/<Filename>
* Filename: <Name of Participant>.json
*
* Structure:
*
* {
*  "Ticker": 'AAPL',
*  "Prices": [
*   {
*    "Date": '1986-01-02T00:00:00',
*    "Value": 22.25,
*    "Action": 'DoNothing' // Could also be BUY or SELL
*   },
*   ... n
*  ]
* }
*/

function getDestinationPath(ticker, participant) {
 return path.join(__dirname, `../results/${ticker}/${participant}.json`);
}

function createFolder(ticker) {
 return Q.nfcall(mkdirp, path.join(__dirname, `../results/${ticker}/`));
}

function createFile(destination, data) {
 var jsonString = JSON.stringify(data, null, 4);
 return Q.nfcall(fs.writeFile, destination, jsonString, 'utf8');
}

//TODO: Verify the permission used for created file/folder... not to unsecure?..
export default {
 save: function (ticker, participant, actions) {
  return createFolder(ticker).then(function () {
   return createFile(getDestinationPath(ticker, participant), {
    Ticker: ticker,
    Prices: actions
   });
  });
 }
};
