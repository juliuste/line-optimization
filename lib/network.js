'use strict'

const stations = require('./stations.json')

const segments = [
	{
		id: 0,
		a: 'oranienburg',
		b: 'birkenwerder',
		frequency: 1,
		duration: 9
	},
	{
		id: 1,
		a: 'birkenwerder',
		b: 'hohen neuendorf',
		frequency: 2,
		duration: 2
	},
	{
		id: 2,
		a: 'hohen neuendorf',
		b: 'frohnau',
		frequency: 1,
		duration: 4
	},
	{
		id: 3,
		a: 'frohnau',
		b: 'waidmannslust',
		frequency: 2,
		duration: 5
	},
	{
		id: 4,
		a: 'waidmannslust',
		b: 'schönholz',
		frequency: 3,
		duration: 7
	},
	{
		id: 5,
		a: 'schönholz',
		b: 'bornholmer',
		frequency: 4,
		duration: 3
	},
	{
		id: 6,
		a: 'bornholmer',
		b: 'gesundbrunnen',
		frequency: 6,
		duration: 1
	},
	{
		id: 7,
		a: 'gesundbrunnen',
		b: 'friedrich',
		frequency: 6,
		duration: 8
	},
	{
		id: 8,
		a: 'friedrich',
		b: 'yorck',
		frequency: 6,
		duration: 8
	},
	{
		id: 9,
		a: 'yorck',
		b: 'schöneberg',
		frequency: 2,
		duration: 4
	},
	{
		id: 10,
		a: 'schöneberg',
		b: 'nikolassee',
		frequency: 2,
		duration: 21
	},
	{
		id: 11,
		a: 'nikolassee',
		b: 'wannsee',
		frequency: 4,
		duration: 2
	},
	{
		id: 12,
		a: 'bernau',
		b: 'buch',
		frequency: 1,
		duration: 10
	},
	{
		id: 13,
		a: 'buch',
		b: 'blankenburg',
		frequency: 2,
		duration: 8
	},
	{
		id: 14,
		a: 'blankenburg',
		b: 'pankow',
		frequency: 3,
		duration: 5
	},
	{
		id: 15,
		a: 'pankow',
		b: 'bornholmer',
		frequency: 4,
		duration: 2
	},
	{
		id: 16,
		a: 'yorck',
		b: 'südkreuz',
		frequency: 4,
		duration: 2
	},
	{
		id: 17,
		a: 'südkreuz',
		b: 'priesterweg',
		frequency: 4,
		duration: 2
	},
	{
		id: 18,
		a: 'priesterweg',
		b: 'lichtenrade',
		frequency: 2,
		duration: 13
	},
	{
		id: 19,
		a: 'lichtenrade',
		b: 'blankenfelde',
		frequency: 1,
		duration: 6
	},
	{
		id: 20,
		a: 'teltow',
		b: 'priesterweg',
		frequency: 2,
		duration: 13
	},
	{
		id: 21,
		a: 'schönholz',
		b: 'hennigsdorf',
		frequency: 1,
		duration: 19
	},
	{
		id: 22,
		a: 'spandau',
		b: 'westkreuz',
		frequency: 2,
		duration: 13
	},
	{
		id: 23,
		a: 'westkreuz',
		b: 'friedrich',
		frequency: 6,
		duration: 15
	},
	{
		id: 24,
		a: 'friedrich',
		b: 'warschauer',
		frequency: 6,
		duration: 11
	},
	{
		id: 25,
		a: 'warschauer',
		b: 'ostkreuz',
		frequency: 5,
		duration: 2
	},
	{
		id: 26,
		a: 'ostkreuz',
		b: 'erkner',
		frequency: 2,
		duration: 28
	},
	{
		id: 27,
		a: 'ostkreuz',
		b: 'friedrichsfelde ost',
		frequency: 6,
		duration: 6
	},
	{
		id: 28,
		a: 'friedrichsfelde ost',
		b: 'hoppegarten',
		frequency: 2,
		duration: 17
	},
	{
		id: 29,
		a: 'hoppegarten',
		b: 'strausberg nord',
		frequency: 1,
		duration: 25
	},
	{
		id: 30,
		a: 'friedrichsfelde ost',
		b: 'springpfuhl',
		frequency: 4,
		duration: 2
	},
	{
		id: 31,
		a: 'springpfuhl',
		b: 'wartenberg',
		frequency: 2,
		duration: 7
	},
	{
		id: 32,
		a: 'springpfuhl',
		b: 'ahrensfelde',
		frequency: 2,
		duration: 9
	},
	{
		id: 33,
		a: 'westkreuz',
		b: 'nikolassee',
		frequency: 2,
		duration: 10
	},
	{
		id: 34,
		a: 'wannsee',
		b: 'potsdam',
		frequency: 2,
		duration: 12
	},
	{
		id: 35,
		a: 'gesundbrunnen',
		b: 'schönhauser',
		frequency: 4,
		duration: 2
	},
	{
		id: 36,
		a: 'schönhauser',
		b: 'ostkreuz',
		frequency: 6,
		duration: 12
	},
	{
		id: 37,
		a: 'ostkreuz',
		b: 'treptower park',
		frequency: 6,
		duration: 1
	},
	{
		id: 38,
		a: 'treptower park',
		b: 'neukölln',
		frequency: 4,
		duration: 5
	},
	{
		id: 39,
		a: 'neukölln',
		b: 'hermann',
		frequency: 7,
		duration: 1
	},
	{
		id: 40,
		a: 'hermann',
		b: 'südkreuz',
		frequency: 6,
		duration: 6
	},
	{
		id: 41,
		a: 'südkreuz',
		b: 'schöneberg',
		frequency: 5,
		duration: 1
	},
	{
		id: 42,
		a: 'schöneberg',
		b: 'westkreuz',
		frequency: 5,
		duration: 11
	},
	{
		id: 43,
		a: 'westkreuz',
		b: 'westend',
		frequency: 5,
		duration: 3
	},
	{
		id: 44,
		a: 'westend',
		b: 'gesundbrunnen',
		frequency: 4,
		duration: 12
	},
	{
		id: 45,
		a: 'neukölln',
		b: 'baumschulenweg',
		frequency: 3,
		duration: 5
	},
	{
		id: 46,
		a: 'baumschulenweg',
		b: 'schöneweide',
		frequency: 6,
		duration: 2
	},
	{
		id: 47,
		a: 'schöneweide',
		b: 'spindlersfeld',
		frequency: 1,
		duration: 6
	},
	{
		id: 48,
		a: 'schöneweide',
		b: 'adlershof',
		frequency: 5,
		duration: 5
	},
	{
		id: 49,
		a: 'adlershof',
		b: 'schönefeld',
		frequency: 2,
		duration: 9
	},
	{
		id: 50,
		a: 'adlershof',
		b: 'grünau',
		frequency: 3,
		duration: 4
	},
	{
		id: 51,
		a: 'grünau',
		b: 'zeuthen',
		frequency: 2,
		duration: 8
	},
	{
		id: 52,
		a: 'zeuthen',
		b: 'königs wusterhausen',
		frequency: 1,
		duration: 8
	},
	{
		id: 53,
		a: 'baumschulenweg',
		b: 'treptower park',
		frequency: 3,
		duration: 4
	},
	{
		id: 54,
		a: 'treptower park',
		b: 'warschauer',
		frequency: 1,
		duration: 3
	},
	{
		id: 55,
		a: 'schönhauser',
		b: 'bornholmer',
		frequency: 2,
		duration: 2
	},
	{
		id: 56,
		a: 'blankenburg',
		b: 'hohen neuendorf',
		frequency: 1,
		duration: 18
	}
]

const nonAdjacentSegments = [
	[33, 10], // wannsee
	[33, 22], // westkreuz
	[33, 42],
	[22, 42],
	[33, 43],
	[22, 43],
	[23, 42],
	[23, 43],
	[41, 9], // schöneberg
	[41, 10],
	[42, 9],
	[42, 10],
	[16, 40], // südkreuz
	[16, 41],
	[17, 40],
	[17, 41],
	[45, 38], // neukölln
	[45, 53], // baumschulenweg
	[53, 38], // treptower park
	[47, 48], // schöneweide
	[49, 50], // adlershof
	[54, 25], // warschauer
	[37, 54], // treptower park
	[37, 25], // ostkreuz
	[37, 26],
	[37, 27],
	[36, 25],
	[36, 26],
	[36, 27],
	[26, 27],
	[28, 30], // friedrichsfelde ost
	[31, 32], // springpfuhl
	[18, 20], // priesterweg
	[23, 7], // friedrichstraße
	[23, 8],
	[24, 7],
	[24, 8],
	[13, 56], // blankenburg
	[56, 2], // hohen neuendorf
	[4, 21], // schönholz
	[55, 6], // bornholmer
	[5, 15],
	[35, 6], // gesundbrunnen
	[35, 7],
	[44, 6],
	[44, 7]
]

module.exports = { segments, nonAdjacentSegments, stations }
