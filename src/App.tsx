import { useState } from 'react'
import './App.css'
import Source from './components/Source'
import Editor from './components/Editor'
import { LocalStorageKey, read, store } from './helper/storage';
import { convertStatesToString, validStates } from './util';
import { REF_STATES, setRefFromString } from './helper/template';

function readStates(text: string | null) {
  if (!text) return [];
  const states: number[][] = [];
  for (const line of text.split(/\s+/)) {
    if (line.length != 33) continue;
    const localStates: number[] = [];
    for (const char of line) {
      if (char == 'x') localStates.push(-1);
      else if (char == '0') localStates.push(0);
      else if (char == '1') localStates.push(1);
    }
    states.push(localStates);
  }
  if (states.length != 128) return [];
  return states;
}

function App() {
  const [states, setStates] = useState<number[][]>(readStates(read(LocalStorageKey.STATES)));
  const [refStates, setRefStates] = useState<number[][] | null>(null);

  return (
    <>
      <Source
        onTextChange={text => {
          const states = readStates(text);
          setStates(states);
          if (validStates(states)) store(LocalStorageKey.STATES, text);
        }}
        onTemplateChange={text => {
          const valid = setRefFromString(text);
          if (valid) {
            setRefStates(REF_STATES);
            store(LocalStorageKey.TEMPLATE, text);
          }
        }}
        states={states}
      />
      <Editor states={states} refStates={refStates} onStateChange={states => {
        setStates(Array.from(states));
        store(LocalStorageKey.STATES, convertStatesToString(states));
      }} />
    </>
  )
}

export default App
