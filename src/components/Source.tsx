import "../style/Source.css";
import { convertStatesToString, validStates } from "../util";

function Source(props: { onTextChange: (text: string) => void, states: number[][] }) {
	const stateStr = validStates(props.states) ? convertStatesToString(props.states) : "";
	return <div className="container" key={stateStr}>
		<h2>Input</h2>
		<textarea placeholder="Paste UOP content here..." onChange={evt => props.onTextChange(evt.target.value)} />
		<h2>Output</h2>
		<textarea readOnly placeholder="Output will be here..." value={stateStr} />
	</div>
}

export default Source;