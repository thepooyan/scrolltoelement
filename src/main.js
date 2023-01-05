export { }
import $ from 'jquery';

function scrollIntoVeiw(ele, callback) {
  if (!ele) return

  function getOffsetTop(element) {
    return element ? (element.offsetTop + getOffsetTop(element.offsetParent)) : 0;
  }
  const targetOffset = getOffsetTop(ele) - (window.innerHeight / 2) + (ele.clientHeight / 2);
  let targetOffsetFloor = Math.floor(targetOffset);
  const doucmentHeight = document.documentElement.scrollHeight;
  const maxOffset = doucmentHeight - window.innerHeight;
  
  if (targetOffsetFloor < 0) targetOffsetFloor = 0;
  if (targetOffsetFloor > maxOffset) targetOffsetFloor = maxOffset;

  const onScroll = function () {
    let windowOffsetFloor = Math.floor(window.pageYOffset);
    if (windowOffsetFloor === targetOffsetFloor) {
      window.removeEventListener('scroll', onScroll)
      callback()
    }
    console.log(`pos:${Math.floor(window.pageYOffset)} target:${targetOffsetFloor} diff:${Math.floor(window.pageYOffset)-targetOffsetFloor}`);
  }
  window.addEventListener('scroll', onScroll);
  window.scrollTo({
    top: targetOffset,
    behavior: 'smooth'
  })
  onScroll()
}

window.onload = e => {
  scrollIntoVeiw(document.querySelector('button'), () => { alert('done') })
}