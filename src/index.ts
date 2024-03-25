#!/usr/bin/env node
import { program } from "commander";
import { ConsoleManager, OptionPopup, PageBuilder, SimplifiedStyledElement } from "console-gui-tools";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { exit } from "process";
import { LONGEST_NAME, NAMES, STATE_NAMES } from "./constants";

program
	.name("CENG3420 Lab3 UOP Editor")
	.description("A TUI program for editing uop file.")
	.version("0.0.1")
	.argument("<path>", "path of the uop file");

program.parse();

const uopPath = program.processedArgs[0];

if (!existsSync(uopPath)) {
	console.log("Cannot find uop file:", uopPath);
	exit(1);
}

const content = readFileSync(uopPath, { encoding: "utf8" });
const states: number[][] = [], initStates: number[][] = [];
for (const line of content.split("\n")) {
	if (line.length != 33) continue;
	const localStates: number[] = [];
	for (const char of line) {
		if (char == 'x') localStates.push(-1);
		else if (char == '0') localStates.push(0);
		else if (char == '1') localStates.push(1);
	}
	states.push(localStates);
	initStates.push(Array.from(localStates));
}

if (states.length != 128 || states.some(s => s.length != 33)) {
	console.log("Invalid uop file");
	exit(2);
}

const GUI = new ConsoleManager({
	title: "UOP Editor",
	logPageSize: 8
});

let selectedPage = 0, selectedRow = 0, modified = false, filtered = false;

const updateConsole = async () => {
	const state = states[selectedPage];
	const builder = new PageBuilder();
	if (STATE_NAMES.has(selectedPage)) builder.addRow({ text: `State: ${selectedPage} `, color: 'yellow' }, { text: STATE_NAMES.get(selectedPage)!, color: "cyan" });
	else builder.addRow({ text: `State: ${selectedPage}`, color: 'yellow' });
	builder.addSpacer();

	for (let jj = 0; jj < state.length; jj++) {
		if (filtered && initStates[selectedPage][jj] != -1) continue;
		const spaces = Array(LONGEST_NAME - NAMES[jj].length + 1).fill(" ").join("");
		const rowOption: SimplifiedStyledElement = { text: `${NAMES[jj]}${spaces}` };
		const coloredState: SimplifiedStyledElement = { text: `${state[jj] < 0 ? "X" : state[jj]}`, color: state[jj] < 0 ? 'yellow' : (state[jj] ? 'green' : 'red') };
		if (jj == selectedRow) builder.addRow(Object.assign(rowOption, { color: 'black', bg: 'bgWhite' }), Object.assign(coloredState, { color: 'black', bg: 'bgWhite' }));
		else builder.addRow(rowOption, coloredState);
	}

	GUI.setPage(builder);
};

GUI.on("keypressed", (key) => {
	switch (key.name) {
		case "space":
			modified = true;
			if (states[selectedPage][selectedRow] != 0) states[selectedPage][selectedRow] = 0;
			else states[selectedPage][selectedRow] = 1;
			updateConsole();
			break;
		case "z":
			modified = true;
			states[selectedPage][selectedRow] = 1;
			updateConsole();
			break;
		case "x":
			modified = true;
			states[selectedPage][selectedRow] = -1;
			updateConsole();
			break;
		case "c":
			modified = true;
			states[selectedPage][selectedRow] = 0;
			updateConsole();
			break;
		case "f":
			filtered = !filtered;
			if (filtered && initStates[selectedPage][selectedRow] != -1) {
				const index = initStates[selectedPage].findIndex(x => x == -1);
				if (index >= 0) selectedRow = index;
			}
			updateConsole();
			break;
		case "d":
			selectedPage = (selectedPage + 1) % 128;
			if (key.ctrl) {
				const keys = Array.from(STATE_NAMES.keys());
				const filtered = keys.filter(x => x >= selectedPage);
				if (!filtered.length) selectedPage = Math.min(...keys);
				else selectedPage = Math.min(...filtered);
			}
			updateConsole();
			break;
		case "a":
			selectedPage--;
			if (selectedPage < 0) selectedPage = 127;
			if (key.ctrl) {
				const keys = Array.from(STATE_NAMES.keys());
				const filtered = keys.filter(x => x <= selectedPage);
				if (!filtered.length) selectedPage = Math.max(...keys);
				else selectedPage = Math.max(...filtered);
			}
			updateConsole();
			break;
		case "w":
			selectedRow--;
			if (selectedRow < 0) selectedRow = 32;
			if (filtered) {
				const arr = initStates[selectedPage].map((v, k) => ({ v, k })).filter(x => x.v == -1);
				const filtered = arr.filter(x => x.k <= selectedRow);
				let index = -1;
				if (filtered.length) index = filtered[filtered.length - 1].k;
				else if (arr.length) index = arr[arr.length - 1].k;
				if (index >= 0) selectedRow = index;
			}
			updateConsole();
			break;
		case "s":
			selectedRow = (selectedRow + 1) % 33;
			if (filtered) {
				const arr = initStates[selectedPage].map((v, k) => ({ v, k })).filter(x => x.v == -1);
				const filtered = arr.filter(x => x.k >= selectedRow);
				let index = -1;
				if (filtered.length) index = filtered[0].k;
				else if (arr.length) index = arr[0].k;
				if (index >= 0) selectedRow = index;
			}
			updateConsole();
			break;
		case "e":
			writeFileSync(uopPath, convertStatesToString(), { encoding: "utf8" });
			GUI.log("Saved!");
			break;
		case "q":
			if (!modified) quit();
			else {
				const popup = new OptionPopup({
					id: "saveAndQuit",
					title: "Save before quitting?",
					options: ["Yes", "No", "Cancel"],
					selected: "Cancel"
				}).show().on("confirm", (selected) => {
					switch (selected) {
						case "Yes":
							writeFileSync(uopPath, convertStatesToString(), { encoding: "utf8" });
						case "No":
							quit();
							break;
						default:
							popup.hide();
							break;
					}
				});
			}
			break;
		case "h":
			GUI.log("Key bindings for this editor:");
			GUI.log("a, d: Navigate different states. Hold ctrl to skip unnecessary states.");
			GUI.log("w, s: Navigate different signals.");
			GUI.log("z, x, c: Set signal to 1, x or 0.");
			GUI.log("space: Toggle signal.");
			GUI.log("f: Toggle show X only.");
			GUI.log("e: Save.");
			GUI.log("q: Quit, and ask to save if modified.");
			break;
	}
});

updateConsole();

function quit() {
	exit(0);
}

function convertStatesToString() {
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