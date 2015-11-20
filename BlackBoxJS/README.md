# cashflow
Cashflow is King

# Architecture
The goal of the system is to simulate a basic price engine and make it possible for traders to write their own algorithms.

# How to

To get it to work you need to have Node 5.0.0 installed on your system, this should also come bundled with Npm 3.3.6 which you will also need.

 ```
 //Navigate to root folder of project.
 cd cashflow
 //Install dependencies.
 npm install
 //Run the application, this will run all algorithms against the provided data and produce the output files.
 npm start
 ```

# Debugging

 ```
 npm install -g node-inspector
 node-debug src/bootstrap.js
 ```

* That will open the node inspector with the execution of the script paused. Due to the fact we are using the babel transpiler you need to place a breakpoint on the "run" function in bootstrap.js and wait for the script to reach that point. This is to give the transpiler time to create the files. After that you are free to place your breakpoints anywhere you want in the program.

# Adding Algorithms

Simply go to src/algorithms/example.js to see how it's done. Also you need to import the file inside src/application.js exactly how
it's done for example.js
