import { LitElement, html, css } from 'lit';
// import images from '../mocks/images.json'

import { XdvStringToKebabCase } from '../mixins/XdvStringToKebabCase'
import { XdvGetData } from '../mixins/XdvGetData';

let data = {}
export class XdvCarousel extends XdvStringToKebabCase(XdvGetData(LitElement)) {
  static get properties() {
    return {
      slidesNumber: { type: Number },
      slideSelected: { type: Number},
      slideUrls: { type: String },
      urls: { type: Array },
      slides: { type: Array }
    };
  }

  constructor () {
    super()
    this.slideUrls = ''
    this.urls = false 
    this.slidesNumber = false 
    this.slideSelected = 0
    this.slides = []
    this.sliderContainer = null 
    document.addEventListener('xdvCheckboxToggle', this.xdvUrlsCarousel.bind(this))
  } 

  connectedCallback() {
    super.connectedCallback();
    
  }
  
   firstUpdated () {
     (async() => {
        await this.getData()
        this.urls = await eval(`this.data.${this.slideUrls}`),
        this.slidesNumber = await this.urls.length - 1
      
      })()
    this.slides = this.shadowRoot.querySelectorAll('.slider__slide')
    const attributes = Object.assign({}, this.dataset)
    const attKeys = Object.keys(attributes)
    for(let i=0; i< attKeys.length; i++) {
      let attKey = attKeys[i]
      attKey.startsWith('slide') && this.renderRoot.host.style.setProperty(`--xdv-${this.kebabCase(attKey)}`, attributes[attKeys[i]] )      
    }
        
    this.sliderContainer = this.shadowRoot.querySelector('.slider__container')
  }

  xdvChangeSlide (e) {
    console.log('DATA ', this.data, this.urls)
    e.stopPropagation()
    let stepValue = false
    e.target.closest('.slider__slide') && (stepValue = (Number(!e.shiftKey) || -1))
    e.target.classList.contains('slider__btn') && (stepValue = (Number(e.target.classList.contains('slider__btn--next')) || -1))
    
    const newSelected = this.slideSelected + stepValue
    this.slideSelected = newSelected > this.slidesNumber 
      ? 0
      : newSelected < 0 
        ? this.slidesNumber
        : newSelected 
  
    this.xdvTranslateSlide(this.slideSelected)
  }

  xdvChangeSlideDots (index, e) {
    e.stopPropagation()
    this.slideSelected = index
    this.xdvTranslateSlide(this.slideSelected)    
  }

  xdvTranslateSlide (slideSelected) {
    this.slides = this.shadowRoot.querySelectorAll('.slider__slide')
    this.slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${(-100) * (slideSelected)}%)`
    })
  }

  async xdvUrlsCarousel (e) {
    if (e.detail.id === this.getAttribute('id')) {
      this.slideUrls = e.detail.value;
      this.urls = eval(`this.data.${this.slideUrls}`),
      this.slidesNumber = this.urls?.length - 1
      this.slideSelected = 0
      this.xdvTranslateSlide(this.slideSelected)
    }
  }

  get loadingTemplate () {
    return html`
    <div class="slider__slide" >
      <h3>Cargando componente </h3>
    </div>
    `
  }

  get carouselTemplate () {
    return html`
      <div class="slider__container" @click=${this.xdvChangeSlide} .slideUrls=${this.getAttribute('slideUrls')} >
        ${
          this.urls.map(url => (
            html`
              <div class="slider__slide" >
                <img src=${url} alt="" />
              </div>
            `
          ))
          
      }
        <button class='slider__btn slider__btn--prev' @click=${this.xdvChangeSlide} type="button">&lt;</button>
        <button class='slider__btn slider__btn--next' @click=${this.xdvChangeSlide} type="button">&gt;</button>
        <div class="slider__dots">
        ${
          this.urls.map((url, index) => {
            return html`
              <div class="slider__dot" ?selected=${(index===this.slideSelected) ? true : false} @click=${(e) => this.xdvChangeSlideDots(index, e)}>
              </div>
            `
          })
        }
        </div>
      </div>
    `
  }

  render() {
    return html`
      ${
        !this.urls
          ? this.loadingTemplate
          : this.carouselTemplate
      }
    `;
  }

  static styles = [
    css`
      :host {
        display: flex;
        place-items: center;
        gap: 0;
        box-sizing: border-box;
        position: relative;
        margin: 0 auto;
        width: var( --xdv-slider-width ,100%);
      }

      slot {
        display: flex;
        place-items: center;
        gap: 0;
        position: relative;
      }

      .slider__container {
        display: flex;
        place-items: center;
        gap: var( --xdv-slider-container-gap, 0);
        max-height: var( --xdv-slider-container-max-height, 450px);
        margin: 0px auto;
        border-radius: var(--xdv-slider-border-radius, 1rem);
        overflow: hidden;
        cursor: pointer;
      }

      .slider__slide {
        min-width: 100%;
        transition: all .5s;
        
      }

      .slider__slide img {
        display: block;
        width: 100%;
      }

      .slider__btn {
        position: absolute;
        top: calc(50% - 20px);
        width: 40px;
        height: 40px;
        padding: 10px;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        background-color: var(--xdv-slider-btn-color ,#fff);
        cursor: pointer;
        transition: transform 0.25s;
      }
      
      .slider__btn.slider__btn--next {
        right: var(--xdv-slider-btn-position ,16px);
        z-index: 1;
      }
    
      .slider__btn.slider__btn--prev {
        left: var(--xdv-slider-btn-position ,16px);
        z-index: 1;
      }
      
      .slider__btn:hover,
      .slider__btn:active {
        transform: scale(1.1);
      }

      .slider__btn:focus-visible {
        outline: none;
      }

      .slider__dots {
        position: absolute;
        bottom: 4px;
        display: flex;
        justify-content: center;
        gap: 5px;
        width: 100%;

      } 

      .slider__dot {
        width: 16px;
        height: 16px;
        border: none;
        border-radius: 50%;
        background-color: var(--xdv-slider-dot-color ,#f5f2f2);
        z-index: 10px;
        cursor: pointer;
        transition: background-color 0.25s;
      }   

      .slider__dot:hover,
      .slider__dot[selected] {
        background-color: var(--xdv-slider-dot-color-hover, #d89999);
      }

      @media screen and (max-width: 900px) {
        :host {
          --xdv-slider-container-max-height: 15rem !important;
        }
      }
      
    `
  ];
}
customElements.define('xdv-carousel', XdvCarousel);
