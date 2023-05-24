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
      if (this.apiUrl.startsWith('https://api.unsplash.com/photos/')) {
        this.data = await fetch(this.apiUrl)
          .then((response) => response.json())
          .then((json) => json
        );
        this.urls = await this.data.map(item => eval(`item.${this.slideUrls}`))
        this.slidesNumber = await this.urls.length - 1
        return
      }

      if (this.apiUrl.startsWith('https://api.unsplash.com/search/photos/')) {
        this.data = await fetch(this.apiUrl)
          .then((response) => response.json())
          .then((json) => json
        );
        this.urls = await this.data.results.map(item => eval(`item.${this.slideUrls}`))
        this.slidesNumber = await this.urls.length - 1
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
        this.slidesNumber = await this.urls.length - 1
    }
  }

}

