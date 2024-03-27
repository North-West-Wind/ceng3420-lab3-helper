function SignalCheckbox(props: { signals: number[], index: number, onChange: (signals: number[]) => void, label: string }) {
	return <>
		<input type="checkbox" checked={props.signals[props.index] == 1} onClick={evt => {
			console.log("clicking", props.index, evt.currentTarget.checked);
			props.signals[props.index] = evt.currentTarget.checked ? 0 : 1;
			props.onChange(props.signals);
		}} /><label>{props.label}</label><br />
	</>
}

export default SignalCheckbox;