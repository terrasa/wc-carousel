import { LitElement, html, css } from 'lit'
import { XdvStringToKebabCase } from '../mixins/XdvStringToKebabCase'
import { XdvSetCustomPropertiesFromAttributesMixin } from '../mixins/XdvSetCustomPropertiesFromAttributesMixin'

export class XdvCheckbox extends XdvStringToKebabCase(XdvSetCustomPropertiesFromAttributesMixin(LitElement)) {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        position: relative;
      }

      :host input {
        position: absolute;
        appearance: none;
        width: var(--xdv-switch-bar-width, 2.75rem);
        height: var(--xdv-switch-bar-height, 1.5rem);
        margin: 0;
        cursor: pointer;
      }

      :host label {
        padding-left: 0.5rem;
        cursor: pointer;
      }

      .sw__continer {
        display: block;
        width: var(--xdv-switch-bar-width, 2.75rem);
        height: var(--xdv-switch-bar-height, 1.5rem);
        box-sizing: border-box;
        border-radius: var(--xdv-switch-bar-radius, 1.5625rem);
        background-color: var(--xdv-switch-bar-bg, var(--grey-inactive));
      }
      
      .sw__item {
        display: inline-block;
        width: var(--xdv-switch-item-width-height, 1.25rem);
        height: var(--xdv-switch-item-width-height, 1.25rem);
        box-sizing: border-box;
        border-radius: var(--xdv-switch-item-radius, 1.5625rem);
        background-color: var(--xdv-switch-item-bg, var(--grey-tertiary));
        translate: var(--xdv-switch-item-initial-position, 0.125rem 0.125rem);
        transition: all .3s;
  
      }
  
      :host([checked]) .sw__item {
        background-color: var(--xdv-switch-item-checked-bg, var(--soft-excel));
        translate: var(--xdv-switch-item-checked-position, 1.375rem 0.125rem);
      } 

      ::slotted(p) {
        color: #fff;
      } 
    `
  ]

  static get properties () {
    return {
      checked: {
        type: Boolean,
        reflect: true
      },
      value: { type: String },
      id: { type: String },
      loaded: { type: Boolean },
      apiValue: { type: String}
    }
  }

  constructor () {
    super()

    this.id = false
    this.checked = false
    this.loaded = false
    this.value = ''
    this.isLabel = false
    this.apiValue = ''
  }

  connectedCallback() {
    super.connectedCallback();
  
  }

  firstUpdated () {
    this.id = this.dataset.checkId || this.xdvRandomID()

    this.isLabel = this.querySelector("[slot='description']")
    this.xdvToggleCheckbox ()
    this.xdvSetCustomProperties ('switch')
  }

  xdvToggleCheckbox () {    
    this.loaded
    ? this.value = this.checked = !this.checked
    : (this.loaded = true, this.value = this.checked)
    
    this.value = this.checked ? `${this.dataset.valueTrue}` : `${this.dataset.valueFalse}`
    this.apiValue = this.checked ? `${this.dataset.apiValueTrue}` : `${this.dataset.apiValueFalse}`
    const xdvCheckboxToggle = new CustomEvent('xdvCheckboxToggle', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        apiValue: this.apiValue,
        id: this.id
      }
    })
    this.dispatchEvent(xdvCheckboxToggle)
  }

  xdvRandomID () {
    const randomId = Math.random()
    const alphanumericId = randomId.toString(36).slice(2)
    return alphanumericId
  }

  render () {
    return html`
      <div class='sw__continer'>
        <div class='sw__item'></div>
      </div>
      <input type="checkbox" id=${this.id} name=${this.id} value=${this.dataset.valueTrue} ?loaded=${this.loaded} @input=${this.xdvToggleCheckbox}>
      ${ this.isLabel && html`<label for=${this.id}> <slot name='description'></slot> </label>`}
    `
  }
}
customElements.define('xdv-checkbox', XdvCheckbox)