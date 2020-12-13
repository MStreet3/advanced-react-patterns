// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

const ToggleStateContext = React.createContext(undefined)
const ToggleDispatchContext = React.createContext(undefined)

function ToggleContextProvider({children}) {
  const [on, toggle] = React.useReducer(state => !state, false)

  return (
    <ToggleStateContext.Provider value={{on}}>
      <ToggleDispatchContext.Provider value={{toggle}}>
        {children}
      </ToggleDispatchContext.Provider>
    </ToggleStateContext.Provider>
  )
}

function useToggleState() {
  const context = React.useContext(ToggleStateContext)
  if (!context) {
    throw new Error('must use toggle state in a provider')
  }
  return context
}

function useToggleDispatch() {
  const context = React.useContext(ToggleDispatchContext)
  if (!context) {
    throw new Error('must use toggle dispatch in a provider')
  }
  return context
}

function useToggle() {
  return [useToggleState(), useToggleDispatch()]
}

function Toggle({children}) {
  return <ToggleContextProvider>{children}</ToggleContextProvider>
}

function ToggleOn({children}) {
  const {on} = useToggleState()
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggleState()
  return on ? null : children
}

function ToggleButton(props) {
  const [{on}, {toggle}] = useToggle()
  return <Switch {...{...props, on, onClick: toggle}} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

// const App = () => <ToggleButton />

export default App

/*
eslint
  no-unused-vars: "off",
*/
