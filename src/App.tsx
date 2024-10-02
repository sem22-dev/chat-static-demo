import './App.css'
import Chat from './components/Chat'
import Header from './components/Header'

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Chat />
      </div>
    </div>
  )
}

export default App