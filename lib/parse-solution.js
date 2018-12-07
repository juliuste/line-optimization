'use strict'

const fs = require('fs')
const parseGurobiSolution = require('parse-gurobi-solution')
const l = require('lodash')
const mercator = require('projections/mercator')
const colorizeTransitGraph = require('colorize-transit-graph')
const network = require('./network.js')

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
			lines: s.lines
		}
	}))

	const lines = l.uniq(l.flatMap(network.segments, s => s.lines)).map(l => ({
		id: l,
		group: l
	}))

	const graph = { nodes, edges, lines }

	const colorized = colorizeTransitGraph(graph)
	return colorized
}

const parseSolution = async () => {
	const fileStream = fs.createReadStream('./solution.sol')
	const solution = await parseGurobiSolution(fileStream)

	const nLines = 25

	for (let s of network.segments) {
		const lines = []
		for (let i of l.range(nLines)) {
			if (solution[`laufs${s.id}_${i}`] === 1) lines.push(i + '')
		}
		s.lines = lines
	}

	process.stdout.write(JSON.stringify((buildGraph(network))))

	// console.log(solution)
}

parseSolution()
