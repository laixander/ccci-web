import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useParticleCanvas(canvasRef: Ref<HTMLCanvasElement | null>) {
  let animationFrameId: number
  let resizeHandler: () => void
  let mouseMoveHandler: (e: MouseEvent) => void

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let particles: any[] = []
    const mouse = { x: null as number | null, y: null as number | null, radius: 150 }

    resizeHandler = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resizeHandler)
    resizeHandler()

    mouseMoveHandler = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', mouseMoveHandler)

    class Particle {
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      color: string
      alpha: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.radius = Math.random() * 2 + 1
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.color = Math.random() > 0.5 ? 'rgba(37, 99, 235, ' : 'rgba(16, 185, 129, '
        this.alpha = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius
            this.x -= (dx / dist) * force * 2
            this.y -= (dy / dist) * force * 2
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color + this.alpha + ')'
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color + '0.8)'
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const particleCount = Math.min(Math.floor((width * height) / 18000), 75)
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()
  })

  onBeforeUnmount(() => {
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
    if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler)
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  })
}
