import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter';
/**
 * @customElement
 * @polymer
 */
class VaadinGridExampleApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <p hidden$="[[propHidden]]">Hola Mundo</p>
      
      <vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort>
        <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
        <vaadin-grid-column width="9em" path="firstName">
            <template class="header">
              <vaadin-grid-filter aria-label="Last Name" path="firstName" value="[[_filterFirstName]]">
                <vaadin-text-field slot="filter" placeholder="Last Name" value="{{_filterFirstName}}" focus-target></vaadin-text-field>
              </vaadin-grid-filter>
            </template>
        </vaadin-grid-column>
        <vaadin-grid-column width="9em" path="lastName">
            <template class="header">
              <vaadin-grid-filter aria-label="Last Name" path="lastName" value="[[_filterLastName]]">
                <vaadin-text-field slot="filter" placeholder="Last Name" value="{{_filterLastName}}" focus-target></vaadin-text-field>
              </vaadin-grid-filter>
            </template>
        </vaadin-grid-column>
        <vaadin-grid-column id="addresscolumn" width="15em" flex-grow="2" header="Address"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'vaadin-grid-example-app'
      },
      propHidden: {
          type: Boolean,
          value: true
      }
    };
  }

  connectedCallback(){
    super.connectedCallback();
      this.$.addresscolumn.renderer = (root, grid, rowData) => {
          root.textContent = `${rowData.item.address.street}, ${rowData.item.address.city}`;
      };

      // Populate the grid with data
      const grid = this.shadowRoot.querySelector('vaadin-grid');
      fetch('https://demo.vaadin.com/demo-data/1.0/people?count=200')
          .then(res => res.json())
          .then(json => grid.items = json.result);
  }
}

window.customElements.define('vaadin-grid-example-app', VaadinGridExampleApp);
