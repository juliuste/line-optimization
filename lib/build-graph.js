'use strict'

const l = require('lodash')
const mercator = require('projections/mercator')
const colorizeTransitGraph = require('colorize-transit-graph')

const generateLines = n => l.range(n).map(x => x + '')

const buildGraph = network => {
	const nodes = Object.values(network.stations).map(s => ({
		id: s.id,
		metadata: {
			x: mercator({ lon: s.location.longitude, lat: s.location.latitude }).x,
			y: mercator({ lon: s.location.longitude, lat: s.location.latitude }).y
		}
	}))
	const edges = network.segments.map(s => ({
		source: network.stations[s.a].id,
		target: network.stations[s.b].id,
		metadata: {
			lines: generateLines(s.frequency)
		}
	}))
	const nLines = l.max(network.segments.map(x => x.frequency))
	const lines = generateLines(nLines).map(l => ({
		id: l,
		group: l
	}))

	const graph = { nodes, edges, lines }

	const colorized = colorizeTransitGraph(graph)
	return colorized
}

module.exports = buildGraph
