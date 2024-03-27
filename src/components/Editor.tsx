import { useState } from "react";
import "../style/Editor.css";
import { REF_STATES, STATE_NAMES } from "../constants";
import SignalCheckbox from "./SignalCheckbox";
import { validStates } from "../util";

function Editor(props: { states: number[][], onStateChange: (states: number[][]) => void }) {
	const [editing, setEditing] = useState(0);

	/*
		Order of sections:
		J      | LD
		Gate   | MUX
		Enable | Misc
	*/
	if (!validStates(props.states)) return <div className="flex vcenter hcenter big-container">
		<h1>Invalid states</h1>
	</div>

	const decEdit = () => {
		setEditing(editing - 1 < 0 ? 127 : editing - 1);
	}

	const decEditFar = () => {
		let newEdit = editing - 1 < 0 ? 127 : editing - 1;
		const keys = REF_STATES.map((v, k) => ({ v, k })).filter(x => x.v.some(v => v == -1)).map(x => x.k);
		const filtered = keys.filter(x => x <= newEdit);
		if (!filtered.length) setEditing(Math.max(...keys));
		else setEditing(Math.max(...filtered));
	}

	const incEdit = () => {
		setEditing((editing + 1) % 128);
	}

	const incEditFar = () => {
		let newEdit = (editing + 1) % 128;
		const keys = REF_STATES.map((v, k) => ({ v, k })).filter(x => x.v.some(v => v == -1)).map(x => x.k);
		const filtered = keys.filter(x => x >= newEdit);
		if (!filtered.length) setEditing(Math.min(...keys));
		else setEditing(Math.min(...filtered));
	}

	return <div className="flex vflex big-container">
		<div className="state-container">
			<h1>
				<span className="change-state" onClick={decEditFar}>{"<<"}</span> <span className="change-state" onClick={decEdit}>{"<"}</span> State {editing} <span className="change-state" onClick={incEdit}>{">"}</span> <span className="change-state" onClick={incEditFar}>{">>"}</span>
			</h1>
			{STATE_NAMES.has(editing) && <p>{STATE_NAMES.get(editing)}</p>}
		</div>
		<div className="flex double-signal-container">
			<div className="signal-container" style={{ borderColor: "#55ff00" }}>
				<h2>J</h2>
				<SignalCheckbox states={props.states} indices={[editing, 1]} label="J6" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 2]} label="J5" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 3]} label="J4" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 4]} label="J3" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 5]} label="J2" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 6]} label="J1" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 7]} label="J0" onChange={states => props.onStateChange(states)} />
			</div>
			<div className="signal-container" style={{ borderColor: "#55ffff" }}>
				<h2>LD</h2>
				<SignalCheckbox states={props.states} indices={[editing, 8]} label="LD.PC" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 9]} label="LD.MAR" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 10]} label="LD.MDR" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 11]} label="LD.IR" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 12]} label="LD.REG" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 13]} label="LD.BEN" onChange={states => props.onStateChange(states)} />
			</div>
		</div>
		<div className="flex double-signal-container">
			<div className="signal-container" style={{ borderColor: "#ff5500" }}>
				<h2>Gate</h2>
				<SignalCheckbox states={props.states} indices={[editing, 14]} label="GatePC" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 15]} label="GateMAR" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 16]} label="GateMDR" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 17]} label="GateALUSHF" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 18]} label="GateRS2" onChange={states => props.onStateChange(states)} />
			</div>
			<div className="signal-container" style={{ borderColor: "#ffff7f" }}>
				<h2>MUX</h2>
				<SignalCheckbox states={props.states} indices={[editing, 19]} label="PCMUX" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 20]} label="ADDR1MUX" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 22]} label="ADDR2MUX" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 24]} label="MARMUX" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 25]} label="MDRMUX" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 26]} label="RS2MUX" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 31]} label="DATASIZE" onChange={states => props.onStateChange(states)} />
			</div>
		</div>
		<div className="flex double-signal-container">
			<div className="signal-container" style={{ borderColor: "#aaaaff" }}>
				<h2>Enable</h2>
				<SignalCheckbox states={props.states} indices={[editing, 27]} label="RS2En" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 28]} label="RS1En" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 29]} label="MIO_EN" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 30]} label="WE" onChange={states => props.onStateChange(states)} />
			</div>
			<div className="signal-container">
				<h2>Misc.</h2>
				<SignalCheckbox states={props.states} indices={[editing, 0]} label="IRD" onChange={states => props.onStateChange(states)} />
				<SignalCheckbox states={props.states} indices={[editing, 32]} label="RESET" onChange={states => props.onStateChange(states)} />
			</div>
		</div>
	</div>
}

export default Editor;