document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.square')
  const animation = element.animate(
    [
      {
        transform: 'translateX(0px)',
      },
      {
        backgroundColor: 'blue',
        offset: 0.8,
      },
      {
        transform: 'translateX(calc(100vw - 100px)) rotate(360deg)',
        backgroundColor: 'crimson',
      },
    ],
    {
      duration: 3000,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out',
      composite: 'add',
      iterationComposite: 'accumulate',
      delay: 0,
      fill: 'both',
      timeline: document.timeline,
    }
  )

  document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('play')) {
        animation.play()
        animation.ready.then(() => {
          console.info('playState after play', animation.playState)
        })
      }
      if (button.classList.contains('pause')) {
        animation.pause()
        animation.ready.then(() => {
          console.info('playState after pause', animation.playState)
        })
      }
      if (button.classList.contains('cancel')) {
        animation.cancel()
        animation.ready.then(() => {
          console.info('playState after cancel', animation.playState)
        })
      }
      if (button.classList.contains('reverse')) {
        animation.reverse()
        animation.ready.then(() => {
          console.info('playState after reverse', animation.playState)
        })
      }
      if (button.classList.contains('finish')) {
        animation.finish()
        animation.ready.then(() => {
          console.info('playState after finish', animation.playState)
        })
      }
      if (button.classList.contains('changeAnimation')) {
        animation.effect.setKeyframes([
          {
            transform: 'translateY(0px)',
          },
          {
            backgroundColor: 'green',
            offset: 0.8,
          },
          {
            transform: 'translateY(calc(100vh - 70px)) rotate(360deg)',
            backgroundColor: 'lightblue',
          },
        ])
      }
      if (button.classList.contains('logInfo')) {
        console.info('playState', animation.playState)
        console.info('currentTime', animation.currentTime)
        console.info('startTime', animation.startTime)
        console.info('playbackRate', animation.playbackRate)
        console.info('keyframes', animation.effect.getKeyframes())
        console.info('timing', animation.effect.getTiming())
        console.info('computed timing', animation.effect.getComputedTiming())
      }
    })
  })

  const playbackRateInput = document.getElementById('playbackRateInput')
  const playbackRateInputValue = document.getElementById('playbackRateInputValue')
  playbackRateInput.addEventListener('input', (e) => {
    animation.updatePlaybackRate(e.target.value)
    playbackRateInputValue.value = e.target.value
  })
  playbackRateInput.value = animation.playbackRate
  playbackRateInputValue.value = animation.playbackRate

  const durationInput = document.getElementById('durationInput')
  const durationInputValue = document.getElementById('durationInputValue')
  durationInput.addEventListener('input', (e) => {
    animation.effect.updateTiming({
      duration: +e.target.value,
    })
    durationInputValue.value = e.target.value
  })
  durationInput.value = animation.effect.getComputedTiming().duration
  durationInputValue.value = animation.effect.getComputedTiming().duration

  const infiniteInput = document.getElementById('infiniteInput')
  infiniteInput.addEventListener('change', (e) => {
    animation.effect.updateTiming({
      iterations: e.target.checked ? Infinity : 1,
    })
  })
  infiniteInput.checked = animation.effect.getComputedTiming().iterations === Infinity

  const currentTimeInput = document.getElementById('currentTimeInput')
  currentTimeInput.value = animation.currentTime
  currentTimeInput.addEventListener('input', (e) => {
    animation.currentTime = +e.target.value
  })

  const startTimeInput = document.getElementById('startTimeInput')
  startTimeInput.value = animation.startTime ?? 0
  startTimeInput.addEventListener('input', (e) => {
    animation.startTime = +e.target.value
  })

  animation.pause()
  console.info('playState after pause', animation.playState)
  console.info('pending after pause', animation.pending)
  animation.ready.then(() => {
    console.info('playState after ready', animation.playState)
    console.info('pending after ready', animation.pending)
  })
  animation.play()
  console.info('playState after play', animation.playState)
  console.info('pending after play', animation.pending)

  animation.finished.then(() => {
    console.info('playState after finished', animation.playState)
  })
})
