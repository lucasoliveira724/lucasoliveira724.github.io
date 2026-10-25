import { useEffect, useRef } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import {
  Bot,
  Cloud,
  Code2,
  Database,
  Globe,
  Monitor,
  Plug,
  Sparkles,
  Workflow,
  type LucideIcon
} from 'lucide-react'
import type { Language } from './i18n'

const topics: Array<{
  id: string
  icon: LucideIcon
  label: Record<Language, string>
  orbit: 'equator' | 'vertical-a' | 'vertical-b'
  angle: number
}> = [
  { id: 'data', icon: Database, label: { pt: 'Data', en: 'Data' }, orbit: 'vertical-b', angle: 228 },
  { id: 'development', icon: Code2, label: { pt: 'Desenvolvimento', en: 'Development' }, orbit: 'equator', angle: 12 },
  { id: 'automation', icon: Bot, label: { pt: 'Automação', en: 'Automation' }, orbit: 'vertical-a', angle: 50 },
  { id: 'salesforce', icon: Cloud, label: { pt: 'Salesforce', en: 'Salesforce' }, orbit: 'vertical-b', angle: 105 },
  { id: 'ai', icon: Sparkles, label: { pt: 'AI', en: 'AI' }, orbit: 'equator', angle: 252 },
  { id: 'apis', icon: Plug, label: { pt: 'APIs', en: 'APIs' }, orbit: 'vertical-a', angle: 290 },
  { id: 'sites', icon: Globe, label: { pt: 'Sites', en: 'Websites' }, orbit: 'equator', angle: 132 },
  { id: 'web-apps', icon: Monitor, label: { pt: 'Aplicações Web', en: 'Web Apps' }, orbit: 'vertical-a', angle: 170 }
]

type Point3D = { x: number; y: number; z: number }
type Point2D = { x: number; y: number; z: number }
type LabelSize = { width: number; height: number }
type LabelPosition = { x: number; y: number; width: number; height: number }

const radians = (degrees: number) => (degrees * Math.PI) / 180
const automaticSpeed = (Math.PI * 2) / 64000
const perspectiveStrength = 0.1

type OrbitPlane = 'equator' | 'vertical-a' | 'vertical-b'

function rotatePoint(point: Point3D, yaw: number, pitch: number): Point3D {
  const cosYaw = Math.cos(yaw)
  const sinYaw = Math.sin(yaw)
  const cosPitch = Math.cos(pitch)
  const sinPitch = Math.sin(pitch)
  const x = cosYaw * point.x + sinYaw * point.z
  const z = -sinYaw * point.x + cosYaw * point.z
  return {
    x,
    y: cosPitch * point.y - sinPitch * z,
    z: sinPitch * point.y + cosPitch * z
  }
}

function pointOnPlane(plane: OrbitPlane, angle: number): Point3D {
  const theta = radians(angle)
  const cosine = Math.cos(theta)
  const sine = Math.sin(theta)

  if (plane === 'equator') return { x: cosine, y: sine, z: 0 }
  if (plane === 'vertical-a') return { x: cosine, y: 0, z: sine }
  return { x: 0, y: cosine, z: sine }
}

function projectPoint(
  point: Point3D,
  yaw: number,
  pitch: number,
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number
): Point2D {
  const rotated = rotatePoint(point, yaw, pitch)
  const perspective = 1 / (1 - rotated.z * perspectiveStrength)
  return {
    x: centerX + rotated.x * radiusX * perspective,
    y: centerY + rotated.y * radiusY * perspective,
    z: rotated.z
  }
}

function pathForPlane(
  plane: 'equator' | 'vertical-a' | 'vertical-b',
  yaw: number,
  pitch: number,
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number
) {
  const segments = 240
  let path = ''

  for (let index = 0; index <= segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2
    const point = projectPoint(
      pointOnPlane(plane, angle * 180 / Math.PI),
      yaw,
      pitch,
      centerX,
      centerY,
      radiusX,
      radiusY
    )
    path += (index === 0 ? 'M' : 'L') + point.x.toFixed(1) + ' ' + point.y.toFixed(1) + ' '
  }

  return path
}

function placeLabels(
  nodes: Point2D[],
  sizes: LabelSize[],
  width: number,
  height: number,
  coreSize: number
): LabelPosition[] {
  const padding = 8
  const positions = nodes.map((node, index) => {
    const size = sizes[index]
    const directionX = node.x - width / 2
    const directionY = node.y - height / 2
    const length = Math.hypot(directionX, directionY) || 1
    const unitX = directionX / length
    const unitY = directionY / length
    const offset = Math.abs(unitX) * size.width / 2 + Math.abs(unitY) * size.height / 2 + 8

    return {
      x: node.x + unitX * offset,
      y: node.y + unitY * offset,
      width: size.width,
      height: size.height
    }
  })

  for (let iteration = 0; iteration < 36; iteration += 1) {
    for (let first = 0; first < positions.length; first += 1) {
      for (let second = first + 1; second < positions.length; second += 1) {
        const a = positions[first]
        const b = positions[second]
        const overlapX = (a.width + b.width) / 2 + 8 - Math.abs(a.x - b.x)
        const overlapY = (a.height + b.height) / 2 + 7 - Math.abs(a.y - b.y)

        if (overlapX > 0 && overlapY > 0) {
          if (overlapX < overlapY) {
            const direction = a.x <= b.x ? -1 : 1
            a.x += direction * overlapX / 2
            b.x -= direction * overlapX / 2
          } else {
            const direction = a.y <= b.y ? -1 : 1
            a.y += direction * overlapY / 2
            b.y -= direction * overlapY / 2
          }
        }
      }
    }

    for (const position of positions) {
      const overlapCoreX = (position.width + coreSize) / 2 + 12 - Math.abs(position.x - width / 2)
      const overlapCoreY = (position.height + coreSize) / 2 + 12 - Math.abs(position.y - height / 2)
      if (overlapCoreX > 0 && overlapCoreY > 0) {
        const moveX = position.x < width / 2 ? -overlapCoreX : overlapCoreX
        const moveY = position.y < height / 2 ? -overlapCoreY : overlapCoreY
        const nextX = position.x + moveX
        const nextY = position.y + moveY
        const xFits =
          nextX >= position.width / 2 + padding &&
          nextX <= width - position.width / 2 - padding
        const yFits =
          nextY >= position.height / 2 + padding &&
          nextY <= height - position.height / 2 - padding

        if (overlapCoreX < overlapCoreY && (xFits || !yFits)) {
          position.x = nextX
        } else if (yFits) {
          position.y = nextY
        } else if (xFits) {
          position.x = nextX
        }
      }
      position.x = Math.min(
        width - position.width / 2 - padding,
        Math.max(position.width / 2 + padding, position.x)
      )
      position.y = Math.min(
        height - position.height / 2 - padding,
        Math.max(position.height / 2 + padding, position.y)
      )
    }
  }

  return positions
}

export default function HeroOrbit({ language }: { language: Language }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const ringRefs = useRef<Array<SVGPathElement | null>>([])
  const lineRefs = useRef<Array<SVGLineElement | null>>([])
  const nodeRefs = useRef<Array<SVGCircleElement | null>>([])
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([])
  const drawRef = useRef<(time: number) => void>(() => {})
  const frameRef = useRef<number | null>(null)
  const activeTopicRef = useRef<number | null>(null)
  const hoveredTopicRef = useRef<number | null>(null)
  const focusedTopicRef = useRef<number | null>(null)
  const motionRef = useRef({
    width: 0,
    height: 0,
    coreSize: 132,
    radiusX: 112,
    radiusY: 132,
    yaw: 0,
    pitch: -0.08,
    velocityYaw: 0,
    velocityPitch: 0,
    dragging: false,
    pointerId: -1,
    lastX: 0,
    lastY: 0,
    lastPointerTime: 0,
    resumeAt: 0,
    reducedMotion: false,
    active: true,
    lastFrame: 0,
    labelSizes: topics.map(() => ({ width: 120, height: 38 }))
  })

  useEffect(() => {
    const root = rootRef.current
    const svg = svgRef.current
    if (!root || !svg) return

    const motion = motionRef.current
    const updateSize = () => {
      const width = root.clientWidth
      const height = root.clientHeight
      motion.width = width
      motion.height = height
      const viewportWidth = window.innerWidth
      const isMobile = viewportWidth <= 680
      const isTablet = viewportWidth <= 960
      motion.coreSize = isMobile ? 108 : isTablet ? 132 : 175
      svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height)
      motion.labelSizes = labelRefs.current.map((label) => ({
        width: label?.offsetWidth ?? 120,
        height: label?.offsetHeight ?? 38
      }))
      const widestLabel = motion.labelSizes.reduce(
        (widest, label) => Math.max(widest, label.width),
        0
      )
      const tallestLabel = motion.labelSizes.reduce(
        (tallest, label) => Math.max(tallest, label.height),
        0
      )
      const radiusXLimit = Math.max(0, (width / 2 - widestLabel / 2 - 8) / 1.3)
      const radiusYLimit = Math.max(0, (height / 2 - tallestLabel / 2 - 8) / 1.3)
      motion.radiusX = Math.min(
        width * (isMobile ? 0.22 : isTablet ? 0.36 : 0.49),
        isMobile ? 76 : isTablet ? 112 : 185,
        radiusXLimit
      )
      motion.radiusY = Math.min(
        height * (isMobile ? 0.27 : isTablet ? 0.32 : 0.49),
        isMobile ? 76 : isTablet ? 132 : 218,
        radiusYLimit
      )
      drawRef.current(performance.now())
    }

    drawRef.current = (_time) => {
      const { width, height } = motion
      if (!width || !height) return

      const centerX = width / 2
      const centerY = height / 2
      const { radiusX, radiusY } = motion
      const ringNames = ['equator', 'vertical-a', 'vertical-b'] as const

      ringRefs.current.forEach((ring, index) => {
        if (ring) {
          ring.setAttribute(
            'd',
            pathForPlane(ringNames[index], motion.yaw, motion.pitch, centerX, centerY, radiusX, radiusY)
          )
        }
      })

      const nodes = topics.map((topic) =>
        projectPoint(
          pointOnPlane(topic.orbit, topic.angle),
          motion.yaw,
          motion.pitch,
          centerX,
          centerY,
          radiusX,
          radiusY
        )
      )

      const labels = placeLabels(nodes, motion.labelSizes, width, height, motion.coreSize)
      nodes.forEach((node, index) => {
        const label = labels[index]
        const line = lineRefs.current[index]
        const circle = nodeRefs.current[index]
        const labelElement = labelRefs.current[index]
        const deltaX = label.x - node.x
        const deltaY = label.y - node.y
        const length = Math.hypot(deltaX, deltaY) || 1
        const unitX = deltaX / length
        const unitY = deltaY / length
        const edgeOffset =
          Math.abs(unitX) * label.width / 2 + Math.abs(unitY) * label.height / 2
        const depth = (node.z + 1) / 2
        const isActive = activeTopicRef.current === index

        if (line) {
          line.setAttribute('x1', node.x.toFixed(1))
          line.setAttribute('y1', node.y.toFixed(1))
          line.setAttribute('x2', (label.x - unitX * edgeOffset).toFixed(1))
          line.setAttribute('y2', (label.y - unitY * edgeOffset).toFixed(1))
          line.style.opacity = String(isActive ? 0.9 : 0.34 + depth * 0.48)
          line.style.strokeWidth = isActive ? '1.5' : ''
        }
        if (circle) {
          circle.setAttribute('cx', node.x.toFixed(1))
          circle.setAttribute('cy', node.y.toFixed(1))
          circle.setAttribute('r', (2.6 + depth * 1.5 + (isActive ? 1.2 : 0)).toFixed(1))
          circle.style.opacity = String(isActive ? 1 : 0.4 + depth * 0.6)
          circle.style.fill = isActive ? 'var(--blue)' : ''
        }
        if (labelElement) {
          labelElement.dataset.active = String(isActive)
          labelElement.style.transform =
            'translate3d(' + label.x.toFixed(1) + 'px, ' + label.y.toFixed(1) +
            'px, 0) translate(-50%, -50%) scale(' + (0.96 + depth * 0.04).toFixed(3) + ')'
          labelElement.style.zIndex = String(Math.round(3 + depth * 3))
        }
      })
    }

    const cancelFrame = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }

    const tick = (time: number) => {
      const delta = Math.min(time - (motion.lastFrame || time), 40)
      motion.lastFrame = time

      if (!motion.dragging) {
        const resumeProgress = motion.resumeAt
          ? Math.min(1, (time - motion.resumeAt) / 1200)
          : 1
        const autoBlend = resumeProgress * resumeProgress * (3 - 2 * resumeProgress)
        motion.yaw += automaticSpeed * delta * autoBlend + motion.velocityYaw * delta
        motion.pitch += motion.velocityPitch * delta
        motion.velocityYaw *= Math.pow(0.94, delta / 16)
        motion.velocityPitch *= Math.pow(0.92, delta / 16)
        if (Math.abs(motion.velocityYaw) < 0.000002) motion.velocityYaw = 0
        if (Math.abs(motion.velocityPitch) < 0.000002) motion.velocityPitch = 0
        motion.pitch = Math.max(-0.9, Math.min(0.9, motion.pitch))
      }

      drawRef.current(time)
      if (!motion.reducedMotion && motion.active) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    const startFrame = () => {
      cancelFrame()
      if (motion.active && !motion.reducedMotion) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        drawRef.current(performance.now())
      }
    }

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => {
      motion.reducedMotion = motionPreference.matches
      startFrame()
    }
    const updatePageVisibility = () => {
      motion.active = document.visibilityState === 'visible'
      startFrame()
    }
    const resizeObserver = new ResizeObserver(updateSize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      motion.active = entry.isIntersecting && document.visibilityState === 'visible'
      startFrame()
    })

    motion.reducedMotion = motionPreference.matches
    motion.active = document.visibilityState === 'visible'
    resizeObserver.observe(root)
    intersectionObserver.observe(root)
    motionPreference.addEventListener('change', updateMotionPreference)
    document.addEventListener('visibilitychange', updatePageVisibility)
    updateSize()
    startFrame()

    return () => {
      cancelFrame()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      motionPreference.removeEventListener('change', updateMotionPreference)
      document.removeEventListener('visibilitychange', updatePageVisibility)
      motion.dragging = false
      drawRef.current = () => {}
    }
  }, [language])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return
    if (
      event.pointerType === 'mouse' &&
      event.target instanceof Element &&
      event.target.closest('.hero-orbit-label')
    ) return
    const motion = motionRef.current
    motion.dragging = true
    motion.pointerId = event.pointerId
    motion.lastX = event.clientX
    motion.lastY = event.clientY
    motion.lastPointerTime = performance.now()
    motion.velocityYaw = 0
    motion.velocityPitch = 0
    motion.resumeAt = 0
    event.currentTarget.setPointerCapture(event.pointerId)
    event.preventDefault()
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const motion = motionRef.current
    if (!motion.dragging || motion.pointerId !== event.pointerId) return

    const now = performance.now()
    const deltaTime = Math.max(8, now - motion.lastPointerTime)
    const yawDelta = (event.clientX - motion.lastX) * 0.006
    const pitchDelta = (event.clientY - motion.lastY) * 0.004
    motion.yaw += yawDelta
    motion.pitch = Math.max(-0.9, Math.min(0.9, motion.pitch + pitchDelta))
    motion.velocityYaw = yawDelta / deltaTime
    motion.velocityPitch = pitchDelta / deltaTime
    motion.lastX = event.clientX
    motion.lastY = event.clientY
    motion.lastPointerTime = now
    drawRef.current(now)
    event.preventDefault()
  }

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const motion = motionRef.current
    if (!motion.dragging || motion.pointerId !== event.pointerId) return

    motion.dragging = false
    motion.resumeAt = performance.now()
    if (motion.reducedMotion) {
      motion.velocityYaw = 0
      motion.velocityPitch = 0
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (motion.reducedMotion) {
      motion.velocityYaw = 0
      motion.velocityPitch = 0
      drawRef.current(performance.now())
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const motion = motionRef.current
    const step = 0.14

    if (event.key === 'ArrowLeft') motion.yaw -= step
    else if (event.key === 'ArrowRight') motion.yaw += step
    else if (event.key === 'ArrowUp') motion.pitch = Math.min(0.9, motion.pitch + step)
    else if (event.key === 'ArrowDown') motion.pitch = Math.max(-0.9, motion.pitch - step)
    else if (event.key === 'Home') {
      motion.yaw = 0
      motion.pitch = -0.08
    } else return

    motion.resumeAt = performance.now()
    motion.velocityYaw = 0
    motion.velocityPitch = 0
    drawRef.current(performance.now())
    event.preventDefault()
  }

  const refreshTopicHighlight = () => {
    activeTopicRef.current = hoveredTopicRef.current ?? focusedTopicRef.current
    drawRef.current(performance.now())
  }

  const keyboardDescription =
    language === 'pt'
      ? 'Use as setas do teclado para girar a órbita. Pressione Home para voltar à posição inicial.'
      : 'Use the arrow keys to rotate the orbit. Press Home to return to the starting position.'
  const accessibleName =
    language === 'pt'
      ? 'Diagrama orbital interativo das áreas de atuação'
      : 'Interactive orbital diagram of professional skills'

  return (
    <div
      ref={rootRef}
      className="hero-visual hero-orbit"
      role="group"
      tabIndex={0}
      aria-label={accessibleName}
      aria-describedby="hero-orbit-keyboard-help"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      <span id="hero-orbit-keyboard-help" className="sr-only">
        {keyboardDescription}
      </span>
      <div className="visual-grid" aria-hidden="true" />
      <svg className="hero-orbit-svg" ref={svgRef} aria-hidden="true" focusable="false">
        <g className="hero-orbit-tracks">
          {['equator', 'vertical-a', 'vertical-b'].map((track, index) => (
            <path
              key={track}
              ref={(element) => { ringRefs.current[index] = element }}
              className={'hero-orbit-track hero-orbit-track--' + index}
            />
          ))}
        </g>
        <g className="hero-orbit-connectors">
          {topics.map((topic, index) => (
            <line
              key={topic.id}
              ref={(element) => { lineRefs.current[index] = element }}
              className="hero-orbit-connector"
            />
          ))}
        </g>
        <g className="hero-orbit-nodes">
          {topics.map((topic, index) => (
            <circle
              key={topic.id}
              ref={(element) => { nodeRefs.current[index] = element }}
              className="hero-orbit-node"
            />
          ))}
        </g>
      </svg>
      <div className="visual-core" aria-hidden="true">
        <Workflow size={44} />
        <span>
          Digital
          <br />Solutions
        </span>
      </div>
      {topics.map((topic, index) => {
        const Icon = topic.icon
        return (
          <span
            key={topic.id}
            ref={(element) => { labelRefs.current[index] = element }}
            className="hero-orbit-label"
            role="img"
            tabIndex={0}
            aria-label={topic.label[language]}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') {
                hoveredTopicRef.current = index
                refreshTopicHighlight()
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') {
                hoveredTopicRef.current = null
                refreshTopicHighlight()
              }
            }}
            onFocus={() => {
              focusedTopicRef.current = index
              refreshTopicHighlight()
            }}
            onBlur={() => {
              focusedTopicRef.current = null
              refreshTopicHighlight()
            }}
          >
            <Icon size={15} aria-hidden="true" />
            {topic.label[language]}
          </span>
        )
      })}
          </div>
  )
}
