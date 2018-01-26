# SCOIR Technical Interview for Back-End Engineers
This repo contains an exercise intended for Back-End Engineers.

## Instructions
1. Fork this repo.
1. Using technology of your choice, complete [the assignment](./Assignment.md).
1. Update this README with
    * a `How-To` section containing any instructions needed to execute your program.
    * an `Assumptions` section containing documentation on any assumptions made while interpreting the requirements.
1. Before the deadline, submit a pull request with your solution.

## Expectations
1. Please take no more than 8 hours to work on this exercise. Complete as much as possible and then submit your solution.
1. This exercise is meant to showcase how you work. With consideration to the time limit, do your best to treat it like a production system.

## How-To
1. watcher.js is run in Node.js. To install node please follow instructions for [windows](http://nodesource.com/blog/installing-nodejs-tutorial-windows/) or [linux](https://nodejs.org/en/download/package-manager/).
1. In terminal run 'node watcher.js' to run with defaults.

## Options

* Options can be set in terminal with 'node watcher.js -flag option'. Directories must be a path relative to the program root folder (i.e. node watcher.js ./files/output).
* -inputDirectory directory
  * Designate folder to watch for new files (default: ./input-directory).
* -outputDirectory directory
  * Designate folder to place parsed data files (default: ./output-directory).
* -errorDirectory directory
  * Designate folder for error logs (default: ./error-directory).
* -interval milliseconds
  * Designate milliseconds to wait before checking input folder (default: 2000).

## Exiting
* While watcher.js is running, end program at any time by entering 'exit' in console.

## Assumptions

* Assumes all directories exist (default and optional).
