export const XdvGetData = (superclass) => {
  return class extends superclass {

    static get properties() {
      return {
        data: { type: Object },
        apiUrl: { type: String}
      };
    }

    constructor () {
      super()

      this.data = {}
      this.apiUrl = this.dataset.apiUrl
    }

    // connectedCallback() {
    //   super.connectedCallback();
      
    //   this.data = fetch('http://localhost:5173/mocks/images.json')
    //     .then((response) => response.json())
    //     .then((json) => json
    //     );
    //   console.log('¡sdfgsdfg!',this.data)
    // }

    async getData () {
      this.data = await fetch(this.apiUrl)
      .then((response) => response.json())
      .then((json) => json
      );

      // const xdvDataDetail = new CustomEvent('xdvDataDetail', {
      //   bubbles: true,
      //   composed: true,
      //   detail: {
      //     data: this.data
      //   }
      // })
      // this.dispatchEvent(xdvDataDetail)
    }
  }

}