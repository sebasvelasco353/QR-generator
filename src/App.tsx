import { useState, useRef, useCallback } from 'react'
import UrlInput from './components/Urlnput';

import QRCode from "react-qr-code";
import { toPng, toSvg } from 'html-to-image';

import './App.css'

type urlType = string;

function App() {
  const ref = useRef<HTMLDivElement>(null)
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


  const onButtonClickPNG = useCallback(() => {

    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'codigoQR_PNG.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })

  }, [ref]);

  const onButtonClickSVG = useCallback(() => {

    if (ref.current === null) {
      return
    }

    toSvg(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'codigoQR_SVG.svg'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })

  }, [ref]);

  return (
    <main>
      <div className='main-controls'>
        <UrlInput value={url} onChange={handleInputChange} />
        <button onClick={handleGenerarQR}>Generar QR</button>
      </div>

      {
        (showQR && url !== '') && (
        <>
          <div className='download-controls'>
            <button onClick={onButtonClickPNG}>Descargar QR en PNG</button>
            <button onClick={onButtonClickSVG}>Descargar QR en SVG</button>
          </div>
          <div ref={ref} className='qr-downloadable'>
            <QRCode value={url} />
          </div>
        </>
        )
      }
    </main>
  )
}

export default App
