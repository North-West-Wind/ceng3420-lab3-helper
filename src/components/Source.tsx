import "../style/Source.css";
import { convertStatesToString, validStates } from "../util";

function Source(props: { onTextChange: (text: string) => void, states: number[][] }) {
	const stateStr = validStates(props.states) ? convertStatesToString(props.states) : "";
	console.log(stateStr);
	return <div className="container" key={stateStr}>
		<textarea placeholder="Paste UOP content here..." onChange={evt => props.onTextChange(evt.target.value)} defaultValue={stateStr} />
	</div>
}

export default Source;