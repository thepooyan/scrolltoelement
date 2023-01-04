export { }
import $ from 'jquery';

function scrollIntoVeiw(ele, callback) {
  if (!ele) return

  function getOffsetTop(element) {
    return element ? (element.offsetTop + getOffsetTop(element.offsetParent)) : 0;
  }
  const offset = getOffsetTop(ele) - (window.innerHeight / 2) + (ele.clientHeight / 2);

  const floorOffset = Math.floor(offset);
  const doucmentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight,
    document.body.clientHeight, document.body.scrollHeight, document.body.offsetHeight);



  let scrollPos = window.scrollY;

  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  })        

  let eix = setTimeout(() => {
    if (window.scrollY === scrollPos) {
      alert('sdf')
      clearInterval(eix)
    }
  }, 1);

  const onScroll = function () {
    clearInterval(eix)
    if (Math.floor(window.pageYOffset) === floorOffset) {
      window.removeEventListener('scroll', onScroll)
      callback()
    }
    if (window.pageYOffset === 0) {
      callback()
      window.removeEventListener('scroll', onScroll)
    }
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      callback()
      window.removeEventListener('scroll', onScroll)
    }
    console.log(`${window.pageYOffset} - ${doucmentHeight - window.innerHeight}`);

  }
  window.addEventListener('scroll', onScroll);
}
scrollIntoVeiw(document.querySelector('button'), () => { alert('done') })