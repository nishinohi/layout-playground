document.addEventListener('DOMContentLoaded', async () => {
  const element = document.querySelector('.square')

  const animations = []
  const createAnimation = () => {
    const animation = element.animate(
      [
        {
          transform: 'translateX(0)',
          easing: 'ease-in',
        },
        {
          backgroundColor: 'blue',
          offset: 0.8,
          composite: 'replace',
        },
        {
          transform: 'translateX(calc(100vw - 100px)) rotate(360deg)',
          backgroundColor: 'crimson',
        },
      ],
      {
        duration: 3000,
        direction: 'alternate',
        fill: 'both',
        iterations: 1,
        easing: 'linear',
        composite: 'replace',
        iterationComposite: 'accumulate',
        timeline: document.timeline,
      }
    )
    animation.addEventListener('remove', (e) => {
      console.info('animation removed by the browser', e)
    })
    return animation
  }

  const addButton = document.getElementById('add-animation-button')
  addButton.addEventListener('click', () => {
    animations.push(createAnimation())
  })
  const logButton = document.getElementById('log-animations-button')
  logButton.addEventListener('click', () => {
    console.info('animations', animations)
    console.info('getAnimations()', element.getAnimations())
  })
})
