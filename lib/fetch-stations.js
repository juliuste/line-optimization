'use strict'

const locations = require('vbb-hafas')('asdasdsa').locations
const find = x => locations(x, { results: 1,
	products: {
		// suburban: true,
		suburban: false,
		// subway: false,
		subway: true,
		tram: false,
		bus: false,
		ferry: false,
		express: false,
		regional: false
	} })

// const stations = [
// 	'oranienburg',
// 	'birkenwerder',
// 	'hohen neuendorf',
// 	'frohnau',
// 	'waidmannslust',
// 	'schönholz',
// 	'bornholmer',
// 	'gesundbrunnen',
// 	'friedrich',
// 	'yorck',
// 	'schöneberg',
// 	'nikolassee',
// 	'wannsee',
// 	'bernau',
// 	'buch',
// 	'blankenburg',
// 	'pankow',
// 	'südkreuz',
// 	'priesterweg',
// 	'lichtenrade',
// 	'blankenfelde',
// 	'teltow',
// 	'hennigsdorf',
// 	'spandau',
// 	'westkreuz',
// 	'warschauer',
// 	'ostkreuz',
// 	'erkner',
// 	'schönhauser',
// 	'treptower park',
// 	'neukölln',
// 	'hermann',
// 	'westend',
// 	'baumschulenweg',
// 	'schöneweide',
// 	'spindlersfeld',
// 	'adlershof',
// 	'schönefeld',
// 	'grünau',
// 	'zeuthen',
// 	'königs wusterhausen',
// 	'friedrichsfelde ost',
// 	'hoppegarten',
// 	'strausberg nord',
// 	'potsdam',
// 	'springpfuhl',
// 	'ahrensfelde',
// 	'wartenberg'
// ]

const stations = [
	'ruhleben',
	'wittenberg',
	'nollendorf',
	'pankow',
	'warschauer',
	'uhland',
	'krumme lanke',
	'innsbrucker'
]

const lookupStations = async () => {
	const s = {}
	for (let st of stations) {
		const [res] = await find(st)
		console.error(res)
		s[st] = res
	}
	return s
}
lookupStations().then(res => { process.stdout.write(JSON.stringify(res)) })
