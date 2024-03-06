const hearts = document.querySelectorAll('.fa-heart')
const cards = document.querySelector('.cards')
const imgsWrapper = document.querySelector('.imgs__wrapper')
const section1 = document.querySelector('.section--1')
section1.style.display = 'none'

// adding the card event listeners:
// like& unlike :
//----------//
cards.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-heart')) {
    e.target.classList.toggle('heart__active')
  }
})

// card__details event :
//------------//
cards.addEventListener('click', function (e) {
  if (
    !e.target.classList.contains('fa-heart') &&
    e.target.hasAttribute('src')
  ) {
    section1.style.display = 'flex'

    cards.style.display = 'none'
    const backHome = document.querySelector('.back__home')
    backHome.addEventListener('click', function () {
      cards.style.display = 'flex'
      section1.style.display = 'none'
    })
    imgsWrapper.innerHTML = ''
    const html = `
    <div class="imgs__wrapper">
          <div class="big">
            <img src="${e.target.getAttribute(
              'src'
            )}" alt="" class="big__img" />
          </div>
          <div class="small">
            <img
              src="${e.target.src}"
              data-position="0"
              alt=""
              class="img__active"
            />
            <img src="/imgs/${
              e.target.dataset.type
            }-1.jpg" data-position="1" alt="" />
            <img src="/imgs/${
              e.target.dataset.type
            }-2.jpg" data-position="2" alt="" />
            <img src="/imgs/${
              e.target.dataset.type
            }-3.jpg" data-position="3" alt="" />
          </div>
        </div>`
    imgsWrapper.insertAdjacentHTML('beforeend', html)
    const big = document.querySelector('.big__img')
    const smallWrapper = document.querySelector('.small')
    const imgs = document.querySelector('.small').querySelectorAll('img')
    let currentShoe = 0
    let counter2 = imgs.length
    document.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowRight') {
        counter2--
        currentShoe++

        if (currentShoe < imgs.length) {
          imgs.forEach((img, i) => {
            img.classList.remove('img__active')
            if (i === currentShoe) {
              img.classList.add('img__active')
              big.setAttribute('src', img.src)
            }
          })
        }
        if (currentShoe === imgs.length) {
          currentShoe = 0
          counter2 = imgs.length
          imgs.forEach((img, i) => {
            img.classList.remove('img__active')
            if (i === currentShoe) {
              img.classList.add('img__active')
              big.setAttribute('src', img.src)
            }
          })
        }
      }
    })
    document.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowLeft') {
        counter2--
        currentShoe--
        console.log(counter2, currentShoe)
        console.log(counter2, currentShoe)
        if (currentShoe > 0) {
          imgs.forEach((img, i) => {
            img.classList.remove('img__active')
            if (i === currentShoe) {
              img.classList.add('img__active')
              big.setAttribute('src', img.src)
            }
          })
        }
        if (currentShoe < 1) {
          currentShoe = imgs.length
          counter2 = 0

          imgs.forEach((img, i) => {
            img.classList.remove('img__active')
            if (i === currentShoe) {
              img.classList.add('img__active')
              big.setAttribute('src', img.src)
            }
          })
        }
      }
    })
    smallWrapper.addEventListener('click', function (e) {
      if (e.target.hasAttribute('src')) {
        imgs.forEach((img) => img.classList.remove('img__active'))
        big.setAttribute('src', e.target.src)
        e.target.classList.add('img__active')
      }
    })
  }
})
