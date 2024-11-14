import { useEffect, useState } from "react";
import "../style/Source.css";
import { convertStatesToString, validStates } from "../util";
import SignalCheckbox from "./SignalCheckbox";
import { isLocalStorageEnabled, LocalStorageKey, read, setLocalStorageEnabled, store } from "../helper/storage";

function Source(props: { onTextChange: (text: string) => void, onTemplateChange: (text: string) => void, states: number[][] }) {
	const [input, setInput] = useState(validStates(props.states) ? convertStatesToString(props.states) : "");
	const [reference, setReference] = useState(read(LocalStorageKey.TEMPLATE) ?? "");
	const [ls, setLs] = useState(isLocalStorageEnabled());

	useEffect(() => {
		if (validStates(props.states)) setInput(convertStatesToString(props.states));
	}, [props.states]);

	return <div className="container">
		<a className="info-container" href="https://github.com/North-West-Wind/ceng3420-lab3-helper" target="source">
			<img src="/uop-editor-assets/info.svg" />
			<label>Info</label>
		</a>
		<h2>Save to LocalStorage?</h2>
		<SignalCheckbox states={[Array(34).fill(ls ? 1 : 0)]} indices={[0, 33]} onChange={() => {
			if (!ls) {
				if (!confirm("uop-editor will be able to store your data in Local Storage. Continue?")) return;
				setLocalStorageEnabled(!ls);
				store(LocalStorageKey.STATES, input);
			} else {
				if (!confirm("This will also clear other data stored by uop-editor (e.g. your states). Continue?")) return;
				setLocalStorageEnabled(!ls);
			}
			setLs(!ls);
		}} />
		<h2>Input</h2>
		<h3 style={{ margin: "0" }}>Your UOP File</h3>
		<h3>This will automatically update</h3>
		<textarea
			placeholder="Paste UOP content here..."
			onChange={evt => {
				setInput(evt.target.value);
				props.onTextChange(evt.target.value);
			}}
			value={input}
		/>
		<h2>Template</h2>
		<h3 style={{ margin: "0" }}>The original unedited UOP file</h3>
		<h3>Useful for students studying after 2023</h3>
		<textarea
			placeholder="Paste UOP reference content here..."
			onChange={evt => {
				setReference(evt.target.value);
				props.onTemplateChange(evt.target.value);
			}}
			value={reference}
		/>
	</div>
}

export default Source;