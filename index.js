#! /usr/bin/env node

const fs = require('fs');
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'json', alias: 'j', type: String },
  { name: 'version', alias: 'v', type: Boolean, defaultValue: false}
]

const options = commandLineArgs(optionDefinitions)

if (options.json) {
  var json = JSON.parse(fs.readFileSync(options.json, 'utf8'));
  var production = '';
  var development = '';
  for (var key in json) {
    if (key === 'devDependencies' || key === 'dependencies') {
      for (var module in json[key]) {
        if (key === 'devDependencies') {
          development += module;
          if (options.version) {
            development += '@' + json[key][module].replace(/\^/g, '');
          }
          development += " ";
        } else {
          production += module;
          if (options.version) {
            production += '@' + json[key][module].replace(/\^/g, '');
          }
          production += " ";
        }
      }
    }
  }
  if (production != '') {
    console.log(`npm install --save ${production}`);
  }
  if (development != '') {
    console.log(`npm install --save-dev ${development}`);
  }
}