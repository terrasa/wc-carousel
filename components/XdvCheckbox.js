import { LitElement, html, css } from 'lit'
import { XdvStringToKebabCase } from '../mixins/XdvStringToKebabCase'

export class XdvCheckbox extends XdvStringToKebabCase(LitElement) {
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
      loaded: { type: Boolean }
    }
  }

  constructor () {
    super()

    this.id = null
    this.checked = false
    this.value = ''
    this.isLabel = false
  }

  connectedCallback() {
    super.connectedCallback();
    
  }

  firstUpdated () {
    this.id = this.dataset.checkId
    this.isLabel = this.querySelector("[slot='description']")

    this.xdvToggleCheckbox ()

    const attributes = Object.assign({}, this.dataset)
    const attKeys = Object.keys(attributes)
    for(let i=0; i< attKeys.length; i++) {
      let attKey = attKeys[i]
      attKey.startsWith('switch') && this.renderRoot.host.style.setProperty(`--xdv-${this.kebabCase(attKey)}`, attributes[attKeys[i]] )      
    }
  }

  xdvToggleCheckbox () {
    this.loaded
      ? this.value = this.checked = !this.checked
      : (this.loaded = true, this.value = this.checked)
    
    this.value = this.checked ? 'urls900random' : 'urls900'
    const xdvCheckboxToggle = new CustomEvent('xdvCheckboxToggle', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        id: this.id
      }
    })
    this.dispatchEvent(xdvCheckboxToggle)
  }

  render () {
    return html`
      <div class='sw__continer'>
        <div class='sw__item'></div>
      </div>
      <input type="checkbox" id='check_toggle' name='check_toggle' value='urls900random' ?loaded=${this.loaded} ?checked=${this.checked} @input=${this.xdvToggleCheckbox}>
      ${ this.isLabel && html`<label for='check_toggle'> <slot name='description'></slot> </label>`}
    `
  }
}
customElements.define('xdv-checkbox', XdvCheckbox)
