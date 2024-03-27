import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Source from './components/Source'
import Editor from './components/Editor'

function App() {
  const [states, setStates] = useState<number[][]>([]);

  return (
    <>
      <Source onTextChange={text => {
        const readStates: number[][] = [];
        for (const line of text.split("\n")) {
        	if (line.length != 33) continue;
        	const localStates: number[] = [];
        	for (const char of line) {
        		if (char == 'x') localStates.push(-1);
        		else if (char == '0') localStates.push(0);
        		else if (char == '1') localStates.push(1);
        	}
        	readStates.push(localStates);
        }
        setStates(readStates);
      }} states={states} />
      <Editor states={states} onStateChange={states => {
        setStates(Array.from(states));
        }} />
    </>
  )
}

export default App
