import React from 'react'
import TextOnSvg from 'react-text-on-svg'
import useStayAwake from './useStayAwake'
import '@fontsource/inter'
import './App.css'

const App = () => {
  const [text, setText] = React.useState('')
  const [activeSign, setActiveSign] = React.useState(false)

  const device = useStayAwake()

  React.useEffect(() => {
    if (device.canSleep) {
      device.preventSleeping()
    }

    return () => {
      if (device.canSleep) {
        device.allowSleeping()
      }
    }
  }, [])

  return (
    <div className="container">
      <main className="main">
        {!activeSign ? (
          <React.Fragment>
            <h1 className="title">Cartello passeggeri</h1>

            <p className="description">Scrivi il nome del passeggero/cliente</p>

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nome Cognome"
              className="input"
            />
            <button className={text?.length === 0 ? 'link-disabled' : 'link'} onClick={() => {
              setText(text.trim());
              setActiveSign(true);
            }}>
              Mostra
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <TextOnSvg
              className="pickup-sign-text"
              text={text}
              width={100}
              height={100}
              textWidth={1}
              fontWeight={400}
              fontFamily="Inter"
              backgroundColor="transparent"
              color="#333"
            />
            <button className="back" onClick={() => setActiveSign(false)}>
              &times;
            </button>
          </React.Fragment>
        )}
      </main>
    </div>
  )
}

export default App
