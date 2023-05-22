export const XdvGetData = (superclass) => {
  return class extends superclass {

    static get properties() {
      return {
        apiUrl: { type: String},
        data: { type: Object }
      };
    }

    constructor () {
      super()

      this.apiUrl = this.dataset.apiUrl
      this.data = {}
    }

    async getData () {
      this.data = await fetch(this.apiUrl)
      .then((response) => response.json())
      .then((json) => json
      );
    }
  }

}


// https://api.unsplash.com/photos/random?count=6&query=canada&client_id=pUjkCSXSh-LvqY8sQ2NmoZlj6hAraID1UlkfeEGKAyU
// https://api.unsplash.com/search/photos/?page=1&per_page=9&query=canada&client_id=pUjkCSXSh-LvqY8sQ2NmoZlj6hAraID1UlkfeEGKAyU
// https://api.unsplash.com/search/photos/?page=1&per_page=4&query=wanderlust&client_id=pUjkCSXSh-LvqY8sQ2NmoZlj6hAraID1UlkfeEGKAyU
