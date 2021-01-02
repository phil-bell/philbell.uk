import { LitElement, html, css } from "lit-element";
import "../inputs/search-input";
import "../tables/add-table";

export class AddForm extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        padding: 31px 0px 0px;
      }
      .add-form__container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        width: 100%;
        padding: 10px;
      }
    `;
  }

  render() {
    return html`
      <div class="add-form__container">
        <search-input></search-input>
      </div>
    `;
  }
}

customElements.define("add-form", AddForm);
