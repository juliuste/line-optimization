'use strict'

const network = require('./network.js')
const shortestPaths = require('./shortest-paths')
const buildModel = require('./build-model')

network.shortestPaths = shortestPaths(network)
const model = buildModel(network)

// const buildGraph = require('./build-graph')
// process.stdout.write(JSON.stringify(buildGraph(network)))
