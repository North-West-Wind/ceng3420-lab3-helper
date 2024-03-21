import { program } from "commander";
import { ConsoleManager, PageBuilder, SimplifiedStyledElement } from "console-gui-tools";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { exit } from "process";
import { LONGEST_NAME, NAMES } from "./constants";

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
const states: number[][] = [];
for (const line of content.split("\n")) {
	if (line.length != 33) continue;
	const localStates: number[] = [];
	for (const char of line) {
		if (char == 'x') localStates.push(-1);
		else if (char == '0') localStates.push(0);
		else if (char == '1') localStates.push(1);
	}
	states.push(localStates);
}

if (states.length != 128 || states.some(s => s.length != 33)) {
	console.log("Invalid uop file");
	exit(2);
}

const GUI = new ConsoleManager({
	title: "UOP Editor",
	logPageSize: 8
});

let selectedPage = 0, selectedRow = 0;

const updateConsole = async () => {
	const state = states[selectedPage];
	const builder = new PageBuilder();
	builder.addRow({ text: `State: ${selectedPage}`, color: 'yellow' });
	builder.addSpacer();

	for (let jj = 0; jj < state.length; jj++) {
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
			if (states[selectedPage][selectedRow] != 0) states[selectedPage][selectedRow] = 0;
			else states[selectedPage][selectedRow] = 1;
			updateConsole();
			break;
		case "right":
			selectedPage = (selectedPage + 1) % 128;
			updateConsole();
			break;
	}
	writeFileSync("output", key.name, { encoding: "utf8" });
});

updateConsole();