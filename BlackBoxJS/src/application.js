'use strict';

import prices from './prices.js';
import results from './results.js';

const ALLOWED_ACTIONS = ['Buy', 'Sell', 'DoNothing'];

function isActionAllowed(action) {
 return ALLOWED_ACTIONS.indexOf(action) > -1;
}

/*
* All algorithms you want to run should be added
* to this array.
*/
var algorithms = [
 require('./algorithms/example.js')
];

function runAlgorithms(instruments) {
 var result = [];

 instruments.forEach(function (instrument) {
  var ticker = instrument.Ticker;
  var prices = instrument.Prices;

  console.log(`--- Running algorithms for ${ticker} ---`);

  algorithms.forEach(function (algorithm) {

   if (typeof algorithm.participant !== 'string' || !algorithm.participant) {
     console.log(' -> Algorithm does not supply a valid "participant" property');
     return;
   }

   if (typeof algorithm.getInstance !== 'function') {
    console.log(' -> Algorithm does not supply a valid "getInstance" function');
    return;
   }

   var algorithmInstance = algorithm.getInstance();

   if (typeof algorithmInstance !== 'function') {
    console.log(' -> "getInstance" function did not return a function');
    return;
   }

   var actions = [];
   var shouldSave = true;

   console.log(` -> Running algorithm made by ${algorithm.participant}`);

   for (let i = 0; i < prices.length; i++) {
    let action = algorithmInstance(prices[i].Date, prices[i].Value);

    if (!isActionAllowed(action)) {
       shouldSave = false;
       break;
    }

    actions.push({
     Date: prices[i].Date,
     Value: prices[i].Value,
     Action: action
    });
   }

   if (shouldSave) {
    results.save(ticker, algorithm.participant, actions).catch(function (error) {
     console.log(`Unable to save result for ${algorithm.participant} on ${ticker}`);
     console.log(error);
    });
   }
  });

  console.log(`--- All algorithms for ${ticker} done ---`);
 });

 return result;
}

export function run() {
 prices.load()
  .then(runAlgorithms)
  .catch(function (error) {
   console.log(error);
  });
}
