export const XdvGetData = (superclass) => {
  return class extends superclass {

    static get properties() {
      return {
        apiUrl: { type: String },
        data: { type: Object },
        slideUrls: { type: String },
        urls: { type: Array },
        slidesNumber: { type: Number }
      };
    }

    constructor () {
      super()

      this.apiUrl = this.dataset.apiUrl
      this.data = {}
      this.slideUrls = ''
      this.urls = false 
      this.slidesNumber = false 
    }

    async getData () {
      // url from api.unsplash
      if (this.apiUrl.startsWith('https://api.unsplash.com/')) {
        this.data = await fetch(this.apiUrl)
          .then((response) => response.json())
          .then((json) => json
        );
        this.urls = await this.data.map(item => eval(`item.${this.slideUrls}`))
        // this.urls = await this.data.map(item => {
        //   item.urls.regular;
        //   console.log('ITEM -- ', item, this.slideUrls, eval(`item.${this.slideUrls}`))
        // })

        this.slidesNumber = await this.urls.length - 1
        console.log('GET DATA -', this.urls, this.slidesNumber)
        return
      }

      // url from picsum list
      if (this.apiUrl.startsWith('https://picsum.photos/v2/')) {
        this.data = await fetch(this.apiUrl)
          .then((response) => response.json())
          .then((json) => json
        );
        this.urls = await this.data.map(item => item[this.slideUrls])
        this.slidesNumber = await this.urls.length - 1
        
        return
      }

      this.data = await fetch(this.apiUrl)
        .then((response) => response.json())
        .then((json) => json
        );
        this.urls = await eval(`this.data.${this.slideUrls}`)
    }
  }

}

// https://picsum.photos/v2/list?page=1&limit=3

// https://api.unsplash.com/photos/random?count=6&query=canada&client_id=pUjkCSXSh-LvqY8sQ2NmoZlj6hAraID1UlkfeEGKAyU
// https://api.unsplash.com/search/photos/?page=1&per_page=9&query=canada&client_id=pUjkCSXSh-LvqY8sQ2NmoZlj6hAraID1UlkfeEGKAyU
// https://api.unsplash.com/search/photos/?page=1&per_page=4&query=wanderlust&client_id=pUjkCSXSh-LvqY8sQ2NmoZlj6hAraID1UlkfeEGKAyU


//<xdv-carousel 
 //     data-api-url='https://api.unsplash.com/photos/random?count=6&query=canada&client_id=pUjkCSXSh-LvqY8sQ2NmoZlj6hAraID1UlkfeEGKAyU'
  //    slideUrls='urls.regular'
  //    data-slider-container-max-height='18rem'
  //    data-slider-btn-color='rgb(248, 210, 121)'
  //    data-slider-dot-color-hover='#e2cf70'
  //  >
  //  </xdv-carousel>