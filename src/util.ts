export function validStates(states: number[][]) {
	return states.length == 128 && states.every(s => s.length == 33);
}

export function convertStatesToString(states: number[][]) {
	let str = "";
	for (const state of states) {
		for (const signal of state) {
			if (signal == -1) str += "x";
			else str += signal;
		}
		str += "\n";
	}
	return str;
}