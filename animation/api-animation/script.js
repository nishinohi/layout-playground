document.addEventListener('DOMContentLoaded', () => {
  const character = document.querySelector('.character')
  const street = document.querySelector('.street')
  const background = document.querySelector('.background')
  const carWrapper = document.querySelector('.car-wrapper')
  const foreground = document.querySelector('.foreground')

  const characterAnimation = character.animate(
    [
      {
        backgroundPosition: '0 0',
      },
      {
        backgroundPosition: 'calc(var(--char-width) * -7) 0',
      },
    ],
    {
      duration: 1000,
      iterations: Infinity,
      easing: 'steps(8, jump-none)',
    }
  )

  const streetAnimation = street.animate(
    [
      {
        transform: 'translateX(0)',
      },
      {
        transform: 'translateX(-50%)',
      },
    ],
    {
      easing: 'linear',
      duration: 12000,
      iterations: Infinity,
    }
  )

  const backgroundAnimation = background.animate(
    [
      {
        transform: 'translateX(100%)',
      },
      {
        transform: 'translateX(-100%)',
      },
    ],
    {
      easing: 'linear',
      duration: streetAnimation.effect.getComputedTiming().duration * 2,
      iterations: Infinity,
    }
  )

  const foregroundAnimation = foreground.animate(
    [
      {
        transform: 'translateX(200%)',
      },
      {
        transform: 'translateX(-200%)',
      },
    ],
    {
      easing: 'linear',
      duration: streetAnimation.effect.getComputedTiming().duration * 1.5,
      iterations: Infinity,
    }
  )

  const runFaster = () => {
    document.getAnimations().forEach((animation) => {
      if (animation.id === 'car') return
      animation.playbackRate = animation.playbackRate < 3 ? animation.playbackRate + 0.1 : 3
    })
  }

  const runSlower = () => {
    document.getAnimations().forEach((animation) => {
      if (animation.id === 'car') return
      animation.playbackRate = animation.playbackRate > 0.5 ? animation.playbackRate - 0.1 : 0.5
    })
  }

  setInterval(() => {
    if (streetAnimation.playState === 'running') runSlower()
  }, 5000)

  const togglePlayState = () => {
    document.getAnimations().forEach((animation) => {
      if (animation.playState === 'running') {
        animation.pause()
        return
      }
      animation.play()
    })
  }

  const addNewCar = () => {
    if (streetAnimation.playState !== 'running' || document.querySelector('.car') !== null) {
      setTimeout(addNewCar, 1000 + Math.random() * 3000)
      return
    }
    const car = document.createElement('div')
    carWrapper.appendChild(car)
    car.classList.add('car')
    const carAnimation = car.animate(
      [
        {
          transform: 'translateX(-100vw)',
        },
        {
          transform: 'translateX(100vw)',
        },
      ],
      {
        id: 'car',
        duration: 500 + Math.random() * 2000,
        iterations: 1,
        easing: 'linear',
      }
    )
    carAnimation.addEventListener('finish', () => {
      carWrapper.removeChild(car)
    })
    // ランダムに車を再度生成
    setTimeout(addNewCar, 1000 + Math.random() * 5000)
  }

  addNewCar()

  const scaleShadow = () => {
    const shadow = document.querySelector('.shadow')
    const { duration, iterations, direction, easing } = character
      .getAnimations()
      .find((animation) => animation.id === 'jump')
      .effect.getComputedTiming()
    shadow.animate(
      [
        {
          transform: 'scale(1)',
        },
        {
          transform: 'scale(1.2)',
        },
      ],
      {
        duration,
        iterations,
        direction,
        easing,
      }
    )
  }

  async function jump() {
    // streetAnimation が停止中はアニメーションの停止中とみなしジャンプしない
    if (streetAnimation.playState !== 'running') return
    if (character.getAnimations().find((animation) => animation.id === 'jump')) return
    characterAnimation.pause()
    character.classList.add('jump')
    const jumpAnimation = character.animate(
      [
        {
          transform: 'translateY(0)',
        },
        {
          transform: 'translateY(-70px)',
        },
      ],
      {
        id: 'jump',
        duration: 500,
        iterations: 2,
        direction: 'alternate',
        easing: 'ease-in-out',
      }
    )
    scaleShadow()
    await jumpAnimation.finished
    characterAnimation.play()
    character.classList.remove('jump')
  }

  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'ArrowUp':
        jump()
        break
      case 'ArrowRight':
        runFaster()
        break
      case 'ArrowLeft':
        runSlower()
        break
      case 'Space':
        togglePlayState()
        break
      default:
        break
    }
  })
})
