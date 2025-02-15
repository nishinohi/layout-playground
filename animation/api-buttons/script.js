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
    })
  })

  const playbackRateInput = document.getElementById('playbackRateInput')
  const playbackRateInputValue = document.getElementById('playbackRateInputValue')
  playbackRateInput.addEventListener('input', (e) => {
    console.info(e.target.value)
    animation.updatePlaybackRate(e.target.value)
    playbackRateInputValue.value = e.target.value
  })
})
