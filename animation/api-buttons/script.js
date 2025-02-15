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
  animation.pause()

  document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('play')) {
        animation.play()
      }
      if (button.classList.contains('pause')) {
        animation.pause()
      }
      if (button.classList.contains('cancel')) {
        animation.cancel()
      }
      if (button.classList.contains('reverse')) {
        animation.reverse()
      }
      if (button.classList.contains('finish')) {
        console.info('finish')
        animation.finish()
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
})
