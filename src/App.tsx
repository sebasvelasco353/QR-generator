import { useState } from 'react'
import UrlInput from './components/Urlnput';
import QRCode from "react-qr-code";
import './App.css'

type urlType = string;

function App() {
  const [url, setUrl] = useState<urlType>('');
  const [showQR, setShowQR] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }
  const handleGenerarQR = () => {
    if(url === '') {
      alert('Te falta poner el link');
      return;
    }

    setShowQR(true);
  }

  return (
    <>
      <UrlInput value={url} onChange={handleInputChange} />
      <button onClick={handleGenerarQR}>Generar QR</button>
      {
        (showQR && url !== '') && <QRCode value={url} />
      }
    </>
  )
}

export default App
