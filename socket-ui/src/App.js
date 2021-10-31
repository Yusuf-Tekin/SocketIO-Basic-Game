import React, { useEffect, useState } from 'react'
import socketIO from 'socket.io-client'

import Draggable from 'react-draggable'
function App() {

  const io = socketIO('http://localhost:5000');

  const [xPos, setX] = useState(60)
  const [yPos, setY] = useState(60)
  io.on('userPositionOnStarted', (position) => {
    setX(position.x)
    setY(position.y)
  })
  let onDragEvent = (e) => {
    let x = e.x
    let y = e.y

    io.emit('userPosition', {
      x,
      y
    })
  }

  return (
    <Draggable
      handle=".handle"
      position={{ x: xPos, y: yPos }}
      grid={[25, 25]}
      scale={1}
      onDrag={onDragEvent}
    >
      <div className="handle" style={{ backgroundColor: 'orange', width: "64px", height: "64px", transition: "0.1s", borderRadius: "6px" }}>
      </div>
    </Draggable>
  )
}

export default App
