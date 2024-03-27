import { useState } from "react";
import "../style/Editor.css";
import { STATE_NAMES } from "../constants";
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

	const incEdit = () => {
		setEditing((editing + 1) % 128);
	}

	return <div className="flex vflex big-container">
		<div className="state-container">
			<h1><span className="change-state" onClick={decEdit}>{"<"}</span> State {editing} <span className="change-state" onClick={incEdit}>{">"}</span></h1>
			{STATE_NAMES.has(editing) && <p>{STATE_NAMES.get(editing)}</p>}
		</div>
		<div className="flex double-signal-container">
			<div className="signal-container" style={{ borderColor: "#55ff00" }}>
				<h2>J</h2>
				<SignalCheckbox signals={props.states[editing]} index={1} label="J6" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={2} label="J5" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={3} label="J4" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={4} label="J3" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={5} label="J2" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={6} label="J1" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={7} label="J0" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
			</div>
			<div className="signal-container" style={{ borderColor: "#55ffff" }}>
				<h2>LD</h2>
				<SignalCheckbox signals={props.states[editing]} index={8} label="LD.PC" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={9} label="LD.MAR" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={10} label="LD.MDR" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={11} label="LD.IR" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={12} label="LD.REG" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={13} label="LD.BEN" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
			</div>
		</div>
		<div className="flex double-signal-container">
			<div className="signal-container" style={{ borderColor: "#ff5500" }}>
				<h2>Gate</h2>
				<SignalCheckbox signals={props.states[editing]} index={14} label="GatePC" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={15} label="GateMAR" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={16} label="GateMDR" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={17} label="GateALUSHF" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={18} label="GateRS2" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
			</div>
			<div className="signal-container" style={{ borderColor: "#ffff7f" }}>
				<h2>MUX</h2>
				<SignalCheckbox signals={props.states[editing]} index={19} label="PCMUX" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={20} label="ADDR1MUX" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={22} label="ADDR2MUX" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={24} label="MARMUX" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={25} label="MDRMUX" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={26} label="RS2MUX" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={31} label="DATASIZE" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
			</div>
		</div>
		<div className="flex double-signal-container">
			<div className="signal-container" style={{ borderColor: "#aaaaff" }}>
				<h2>Enable</h2>
				<SignalCheckbox signals={props.states[editing]} index={27} label="RS2En" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={28} label="RS1En" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={29} label="MIO_EN" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={30} label="WE" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
			</div>
			<div className="signal-container">
				<h2>Misc.</h2>
				<SignalCheckbox signals={props.states[editing]} index={0} label="IRD" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
				<SignalCheckbox signals={props.states[editing]} index={32} label="RESET" onChange={signals => { props.states[editing] = signals; props.onStateChange(props.states); }} />
			</div>
		</div>
	</div>
}

export default Editor;