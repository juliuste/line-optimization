'use strict'

const stations = require('./stations-u.json')

const segments = [
	{
		id: 0,
		a: 'ruhleben',
		b: 'wittenberg',
		frequency: 2,
		duration: 20
	},
	{
		id: 1,
		a: 'wittenberg',
		b: 'nollendorf',
		frequency: 4,
		duration: 1
	},
	{
		id: 2,
		a: 'nollendorf',
		b: 'pankow',
		frequency: 2,
		duration: 20
	},
	{
		id: 3,
		a: 'uhland',
		b: 'wittenberg',
		frequency: 1,
		duration: 5
	},
	{
		id: 4,
		a: 'krumme lanke',
		b: 'wittenberg',
		frequency: 2,
		duration: 20
	},
	{
		id: 5,
		a: 'innsbrucker',
		b: 'nollendorf',
		frequency: 2,
		duration: 10
	},
	{
		id: 6,
		a: 'nollendorf',
		b: 'warschauer',
		frequency: 3,
		duration: 20
	}
]

const nonAdjacentSegments = [
	[3, 4],
	[0, 3],
	[0, 4],
	[5, 1],
	[5, 2]
]

module.exports = { segments, nonAdjacentSegments, stations }
