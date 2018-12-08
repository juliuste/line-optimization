'use strict'

const lodash = require('lodash')

const w = (line) => process.stdout.write(line + '\n')
const wt = (line) => process.stdout.write(' ' + line + '\n')

const generateLines = n => lodash.range(n).map(x => x + '')
const maxLines = 30
const lines = generateLines(maxLines)

const buildModel = network => {
	const binary = []
	const integer = []
	const constraints = []
	const umstiegeAufJVars = []

	for (let s of network.segments) {
		// lines on segment
		const lAufSVars = []
		for (let l of lines) lAufSVars.push(`laufs${s.id}_${l}`)
		constraints.push(`${lAufSVars.join(' + ')} = ${s.frequency}`)
		binary.push(...lAufSVars)
	}

	for (let pair of network.nonAdjacentSegments) {
		for (let l of lines) {
			const lAufA = `laufs${pair[0]}_${l}`
			const lAufB = `laufs${pair[1]}_${l}`
			constraints.push(`${lAufA} + ${lAufB} <= 1`)
		}
	}

	// segments on journey
	for (let j = 0; j < network.shortestPaths.length; j++) {
		const journey = network.shortestPaths[j]
		for (let s of journey) {
			const jAufSUeberLVars = []
			for (let l of lines) {
				const jAufSUeberL = `jaufsueberl${j}_${s}_${l}`
				jAufSUeberLVars.push(jAufSUeberL)
				constraints.push(`laufs${s}_${l} - ${jAufSUeberL} >= 0`)
			}
			constraints.push(`${jAufSUeberLVars.join(' + ')} = 1`)
			binary.push(...jAufSUeberLVars)
		}
	}

	for (let j = 0; j < network.shortestPaths.length; j++) {
		const journey = network.shortestPaths[j]
		const umstiegAufJZwischenPQVars = []
		for (let i = 0; i < journey.length - 1; i++) {
			const keinUmstiegAufJZwischenPQFuerLVars = []
			const p = journey[i]
			const q = journey[i + 1]
			for (let l of lines) {
				const keinUmstiegAufJZwischenPQFuerL = `keinumstiegaufjzwischenpqfuerl${j}_${p}_${q}_${l}`
				const jAufPUeberL = `jaufsueberl${j}_${p}_${l}`
				const jAufQUeberL = `jaufsueberl${j}_${q}_${l}`
				constraints.push(`${jAufPUeberL} - ${keinUmstiegAufJZwischenPQFuerL} >= 0`)
				constraints.push(`${jAufQUeberL} - ${keinUmstiegAufJZwischenPQFuerL} >= 0`)
				keinUmstiegAufJZwischenPQFuerLVars.push(keinUmstiegAufJZwischenPQFuerL)
			}
			binary.push(...keinUmstiegAufJZwischenPQFuerLVars)
			const umstiegAufJZwischenPQ = `umstiegaufjzwischenpq${j}_${p}_${q}`
			umstiegAufJZwischenPQVars.push(umstiegAufJZwischenPQ)
			constraints.push(`${umstiegAufJZwischenPQ} + ${keinUmstiegAufJZwischenPQFuerLVars.join(' + ')} = 1`)
		}
		const umstiegeAufJ = `c_${j}`
		constraints.push(`${umstiegAufJZwischenPQVars.join(' + ')} - ${umstiegeAufJ} = 0`)
		binary.push(...umstiegAufJZwischenPQVars)
		integer.push(umstiegeAufJ)
		umstiegeAufJVars.push(umstiegeAufJ)
	}

	for (let l of lines) {
		const lineVars = []
		for (let station of Object.keys(network.stations)) {
			const helperVar1 = `hl1_${l}_${network.stations[station].id}`
			const helperVar2 = `hl2_${l}_${network.stations[station].id}`
			binary.push(helperVar1, helperVar2)
			const segments = network.segments.filter(s => [s.a, s.b].includes(station))
			const segmentVars = segments.map(s => `laufs${s.id}_${l}`)
			constraints.push(`${segmentVars.join(' + ')} <= 2`)
			constraints.push(`${segmentVars.join(' + ')} - 2 ${helperVar2} - ${helperVar1} = 0`)
			lineVars.push(helperVar1)
		}
		constraints.push(`${lineVars.join(' + ')} <= 2`)
	}

	// write model
	// 1. objective function
	w('Minimize')
	wt(umstiegeAufJVars.join(' + '))

	// 2. constraints
	w('Subject To')
	constraints.forEach(c => wt(c))

	// 3. bounds
	w('Bounds')
	integer.forEach(i => wt(`0 <= ${i} <= 4`))

	// 4. integer variables
	w('General')
	integer.forEach(i => wt(i))

	// 5. binary variables
	w('Binary')
	binary.forEach(b => wt(b))

	// 6. end
	w('End')
}

module.exports = buildModel
