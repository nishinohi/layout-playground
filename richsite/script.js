document.addEventListener('DOMContentLoaded', () => {
  const logoSvg = document.getElementById('logo')
  const logoSvgPath = document.querySelector('.cls-1')
  // logoSvg の animate はあくまでアニメーションのトリガで
  // アニメーションが設定されているのは path なのでパスにイベントを設定
  logoSvgPath.addEventListener('animationend', () => {
    logoSvg.classList.remove('animate')
    setTimeout(() => logoSvg.classList.add('animate'), 5000)
  })
})
