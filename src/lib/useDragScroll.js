import { useEffect } from 'react'

const THRESHOLD = 4

export default function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let down = false
    let moved = false
    let startX = 0
    let startLeft = 0

    const onPointerDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      down = true
      moved = false
      startX = e.clientX
      startLeft = el.scrollLeft
      el.style.scrollSnapType = 'none'
    }

    const onPointerMove = (e) => {
      if (!down) return
      const dx = e.clientX - startX
      if (!moved && Math.abs(dx) <= THRESHOLD) return
      moved = true
      e.preventDefault()
      el.style.cursor = 'grabbing'
      el.scrollLeft = startLeft - dx
    }

    const onPointerUp = () => {
      if (!down) return
      down = false
      el.style.cursor = ''
      el.style.scrollSnapType = ''
    }

    const onClickCapture = (e) => {
      if (!moved) return
      e.preventDefault()
      e.stopPropagation()
      moved = false
    }

    const onDragStart = (e) => e.preventDefault()

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('click', onClickCapture, true)
    el.addEventListener('dragstart', onDragStart)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('click', onClickCapture, true)
      el.removeEventListener('dragstart', onDragStart)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
  }, [ref])
}
