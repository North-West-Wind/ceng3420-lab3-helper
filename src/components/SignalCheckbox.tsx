import { REF_STATES } from "../constants";
import "../style/SignalCheckbox.css";

const colors = ["#ffaa00", "#ff0000", "#55ff7f"];

function SignalCheckbox(props: { states: number[][], indices: number[], onChange: (states: number[][]) => void, label: string }) {
	return <div className="checkbox-container">
		<div className="checkbox" style={{ backgroundColor: colors[props.states[props.indices[0]][props.indices[1]] + 1] }} onClick={() => {
			props.states[props.indices[0]][props.indices[1]] = props.states[props.indices[0]][props.indices[1]] > 0 ? 0 : 1;
			props.onChange(props.states);
		}} /><label>{props.label}{REF_STATES[props.indices[0]][props.indices[1]] == -1 ? " *" : ""}</label>
	</div>
}

export default SignalCheckbox;