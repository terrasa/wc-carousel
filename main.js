import './style.css'
import { XdvCarousel } from './components/XdvCarousel.js'
import { XdvCheckbox } from './components/XdvCheckbox'

document.querySelector('#app').innerHTML = `
  <h2>web components</h2>
  <div>
    <div>
      <h3>Carrusel (avanzar click / retorceder shift + click)</h3>
      <h3>Check box</h3>
    </div>  
    <xdv-carousel 
      data-api-url='http://localhost:5173/mocks/images.json'
      slideUrls='urls900'
      data-slider-width='80%'
      data-slider-container-max-height='12.5rem'
      data-slider-btn-position='-56px'
      data-slider-btn-color='#b38181'
      data-slider-dot-color-hover='#dacd88'
    >
    </xdv-carousel>
  </div>
  </br>
  <div class="grid-3">
    <div></div>
    <div class='relative'>
      <xdv-carousel
        data-api-url='http://localhost:5173/mocks/images.json'
        slideUrls='urls900'
        id='carousel_b'
        data-slider-container-max-height='10rem'
      >
      </xdv-carousel>
      <div class='absolute top-8 left-8'>
        <xdv-checkbox data-check-id='carousel_b' checked>
          
        </xdv-checkbox>
      </div>
    </div>
    <div></div>
  </div>
  <br/>
  <div class='relative'>
    <xdv-carousel
      id='carousel_a'
      data-api-url='http://localhost:5173/mocks/images.json'
      slideUrls='urls900'
    >
    </xdv-carousel>
    <div class='absolute top-12 left-12'>
      <xdv-checkbox
        data-check-id='carousel_a'
        data-switch-bar-bg='var(--client-tertiary-9)'
        data-switch-item-radius='1rem'
        data-switch-item-initial-position='0rem -0.375rem'
        data-switch-item-checked-position='1.5rem -0.375rem'
        data-switch-bar-height='0.5rem'
        data-switch-item-checked-bg='#df5c16'
      >
        <p slot='description'>Imagenes fijas o random</p>
      </xdv-checkbox>
    </div>
  </div>
`