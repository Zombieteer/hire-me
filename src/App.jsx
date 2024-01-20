import { useEffect, useRef, useState } from 'react'
import './App.css'
import homeList from './assets/homePage'
import noList from './assets/nos'
import yesList from './assets/yeses'

function App() {
  const [homeState, setHomeState] = useState('home')
  const [asset, setAsset] = useState({})
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const noBtnRef = useRef()

  const moveButton = () => {
    const newX = Math.random() * (window.innerWidth - 50)
    const newY = Math.random() * (window.innerHeight - 20)
    setPosition({ left: newX, top: newY })
    let refStyle = noBtnRef?.current?.style?.position
    if (refStyle != "absolute") noBtnRef.current.style.position = "absolute"
  }

  const handleMouseMove = e => {

    const btnRect = e.target.getBoundingClientRect()
    const mouseDistance = 50

    if (
      e.clientX < btnRect.right + mouseDistance &&
      e.clientX > btnRect.left - mouseDistance &&
      e.clientY < btnRect.bottom + mouseDistance &&
      e.clientY > btnRect.top - mouseDistance
    ) {
      moveButton()
    }
  }

  useEffect(() => {
    const list =
      homeState === 'home' ? homeList : homeState === 'yes' ? yesList : noList
    const randomAsset = list[Math.floor(Math.random() * list.length)]
    const assetExtension = randomAsset.split('.').pop()
    randomAsset && assetExtension && setAsset({ randomAsset, assetExtension })
  }, [homeState])

  const onClickHandler = type => {
    setHomeState(type)
  }

  if (!asset) return <></>

  return (
    <>
      {homeState === 'home' && <h2>Wanna Hire Me?</h2>}

      {['mp4'].includes(asset?.assetExtension) ? (
        <video
          style={{ maxWidth: '70vw', maxHeight: '70vh' }}
          src={asset.randomAsset}
          autoPlay
          loop
        />
      ) : (
        <img
          style={{ maxWidth: '70vw', maxHeight: '70vh' }}
          src={asset.randomAsset}
          alt='Random Image'
        />
      )}

      {homeState === 'home' && (
        <div style={{ marginTop: '10px' }}>
          <button
            style={{ marginRight: 10 }}
            onClick={_ => onClickHandler('yes')}
          >
            Yes
          </button>
          <button
            ref={noBtnRef}
            style={{
              // position: 'absolute',
              left: `${position.left}px`,
              top: `${position.top}px`,
              transition: 'all 0.5s ease'
            }}
            onMouseMove={handleMouseMove}
            onClick={_ => onClickHandler('no')}
          >
            No
          </button>
        </div>
      )}
      {homeState === 'no' && (<h2>How dare you?</h2>)}
      {homeState === 'yes' && (<h2>Yeaaah !!</h2>)}
    </>
  )
}

export default App
