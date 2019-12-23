import React, { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

const Tilt = ({ options = {}, ...props }) => {
  const root = useRef(null)
  useEffect(() => {
    VanillaTilt.init(root.current, {
      max: 7.5,
      scale: 1.05,
      speed: 400,
      glare: false,
      gyroscope: false,
      ...options
    })
  }, [])

  return <div ref={root} {...props} />
}

export default Tilt
