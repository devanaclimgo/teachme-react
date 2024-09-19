import { useState } from "react"
import { ItemSuggestion } from "./components/ItemSuggestion"
import { getHistoric, setHistoric } from "./storage/historic"

type ProgressType = 'pending' | 'started' | 'done'

function App() {
  const [progress, setProgress] = useState<ProgressType>('pending')
  const [textarea, setTextarea] = useState<string>('')
  const [chat, setChat] = useState<string[]>([])

  function resetChat() {
    setProgress('pending')
    setChat([])
  }

  function handleSubmitChat() {
    if (!textarea) {
      return
    }

    const message = textarea
    setTextarea('')

    if (progress === 'pending') {
      setHistoric(message)
      setChat(text => [...text, textarea])
      setChat(text => [...text, 'Aqui será a pergunta gerada por uma IA.'])

      setProgress('started')
      return
    }

    setChat(text => [...text, message])
    setChat(text => [...text, 'Aqui será o feedback gerado por uma IA.'])

    setProgress('done')
  }

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <details open className="suggestion">
            <summary>Tópicos Sugeridos</summary>
            <ItemSuggestion title="HTML" onClick={() => setTextarea('HTML')}/>
            <ItemSuggestion title="CSS" onClick={() => setTextarea('CSS')}/>
            <ItemSuggestion title="Javascript" onClick={() => setTextarea('Javascript')}/>
            <ItemSuggestion title="Typescript" onClick={() => setTextarea('Typescript')}/>
          </details>

          <details open className="historic">
            <summary>Histórico</summary>
            {
              getHistoric().map(item => (
                <ItemSuggestion title={item} onClick={() => setTextarea(item)}/>
              ))
            }

          </details>
        </div>

        <div className="content">
          {progress === 'pending' && (
            <div className="box-home">
              <span>Olá, eu sou o</span>
              <h1>teach<span>.me</span></h1>
              <p>Estou aqui para te ajudar nos seus estudos.</p>
              <p>Selecione um dos tópicos sugeridos ao lado ou digite um tópico que deseja estudar para começarmos</p>
            </div>
          )
          }

          {progress !== 'pending' && (
            <div className="box-chat">
              {chat[0] && (
                <h1>Você está estudando sobre <span>{chat[0]}</span></h1>
              )}

              {chat[1] && (
                <div className="question">
                  <h2><img src="./assets/question.svg" alt="Ícone interrogação" />Perguntas</h2>
                  <p>{chat[1]}</p>
                </div>
              )}

              {chat[2] && (
                <div className="answer">
                  <h2>Sua Resposta</h2>
                  <p>{chat[2]}</p>
                </div>
              )}

              {chat[3] && (
                <div className="feedback">
                  <h2>Feedback teach<span>.me</span></h2>
                  <p>{chat[3]}</p>
                  <div className="actions">
                    <button onClick={resetChat}>Estudar novo tópico</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {progress !== 'done' && (
            <div className="box-input">
            <textarea
              value={textarea}
              onChange={element => setTextarea(element.target.value)}
              placeholder={
                progress === 'started' ? "Insira sua resposta..." : "Insira o tema que deseja estudar..."
              } />
            <button onClick={handleSubmitChat}>{progress === 'pending' ? "Enviar Pergunta" : "Enviar resposta"}</button>
          </div>
          )}

          <footer className="box-footer">
            <p>teach<span>.me</span></p>
          </footer>
        </div>
      </div>
    </>
  )
}

export default App
