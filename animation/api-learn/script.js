document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.square')
  // KeyframeEffect と Animation Object を個別に定義する方法（後半のコメントアウト）と
  // 要素にショートカットとして .animate() メソッドを使う方法（前半）がある
  // animate を使用するとデフォルトで再生が始まるので、読み込み後に再生したくない場合は pause() で止める
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
      delay: 0,
      fill: 'both',
      timeline: document.timeline,
    }
  )
  animation.pause()
  setTimeout(() => {
    animation.play()
  }, 1000)

  //   const squareKeyframeEffect = new KeyframeEffect(
  //     element,
  //     [
  //       {
  //         transform: 'translateX(0px)',
  //       },
  //       {
  //         backgroundColor: 'blue',
  //         offset: 0.8,
  //       },
  //       {
  //         transform: 'translateX(calc(100vw - 100px)) rotate(360deg)',
  //         backgroundColor: 'crimson',
  //       },
  //     ],
  //     {
  //       duration: 3000,
  //       iterations: Infinity,
  //       direction: 'alternate',
  //       easing: 'ease-in-out',
  //       composite: 'add',
  //       delay: 1000,
  //       fill: 'both',
  //     }
  //   )

  //   const squareAnimation = new Animation(squareKeyframeEffect, document.timeline)
  //   squareAnimation.play()
})
