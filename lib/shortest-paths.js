'use strict'

const g = require('graphlib')
const l = require('lodash')

const createNodeId = x => `n${x}`

const getPath = (start, end, weights) => {
	const path = [end]
	while (path[path.length - 1] !== start) {
		const current = weights[path[path.length - 1]]
		path.push(current.predecessor)
	}
	return path.filter(x => x[0] === 'n').map(x => +x.substr(1))
}

const shortestPaths = network => {
	const graph = new g.Graph({ directed: false, multigraph: true })
	for (let station of Object.values(network.stations)) {
		graph.setNode(station.id, station.id)
	}
	for (let segment of network.segments) {
		const n = createNodeId(segment.id)
		graph.setNode(n, n)
		const a = network.stations[segment.a]
		const b = network.stations[segment.b]
		graph.setEdge({ v: a.id, w: n, name: segment.duration / 2 })
		graph.setEdge({ v: b.id, w: n, name: segment.duration / 2 })
	}

	const allWeights = g.alg.dijkstraAll(graph, e => +e.name, v => graph.nodeEdges(v))

	const paths = []

	const numberOfSamples = 60
	for (let c of l.range(numberOfSamples)) {
		const [o, i] = l.shuffle(l.range(network.segments.length))
		const outer = createNodeId(network.segments[o].id)
		const inner = createNodeId(network.segments[i].id)
		const outerWeights = allWeights[outer]
		const path = getPath(outer, inner, outerWeights)
		paths.push(path)
	}

	// for (let o = 0; o < network.segments.length; o++) {
	// 	for (let i = 1; i < o; i++) {
	// 	}
	// }

	return paths
}

module.exports = shortestPaths
