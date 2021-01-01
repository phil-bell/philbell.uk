import { LitElement, html, css } from "lit-element";
import Cookies from "js-cookie";

export class SearchInput extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        display: flex;
        justify-content: start;
      }
      .search__container {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      .search__label {
        font-size: 16px;
        position: relative;
        bottom: 27px;
        margin: auto;
        left: 0;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
      }
      .search__input {
        font-size: 16px;
        font-family: var(--font-family);
        -webkit-font-smoothing: antialiased;
        background: var(--primary-color);
        color: var(--secondary-color);
        border: 1px solid var(--secondary-color);
        border-radius: 8px;
        height: 35px;
        width: 500px;
        text-align: center;
        margin: auto;
        transition: border-color 0.25s ease-in-out;
      }
      .search__input:hover:not(:focus) {
        color: var(--hover-color);
      }
      .search__input:hover ~ .search__label {
        color: var(--hover-color);
      }
      .search__input:focus {
        border: 1px solid var(--hover-color);
        outline: none;
      }
      .search__input:focus ~ .search__label {
        left: 290px;
        color: var(--secondary-color);
      }
      .search__input:not(:placeholder-shown) ~ .search__label {
        left: 290px;
        color: var(--secondary-color);
        cursor: pointer;
      }
      .search__label:hover {
        color: var(--hover-color) !important;
      }

      @media only screen and (max-width: 725px) {
        .search__input {
          width: 65%;
        }
        .search__input:focus ~ .search__label {
          left: 0;
          bottom: 65px;
        }
        .search__input:not(:placeholder-shown) ~ .search__label {
          left: 0;
          bottom: 65px;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="search__container">
        <input
          id="search-input"
          class="search__input"
          placeholder=" "
          type="text"
          @keyup="${(event) => {
            this.handleKeyUp(event.target.value);
          }}"
        />
        <label
          class="search__label"
          for="search-input"
          @click=${(event) => {
            this.handleKeyUp(event.target.previousElementSibling.value);
          }}
          >search</label
        >
      </div>
    `;
  }

  async handleKeyUp(value) {
    await fetch(window.location.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ term: value }),
    })
      .then((response) => response.json())
      .then((data) => document.querySelector("add-table").updateTable(data));
  }
}

customElements.define("search-input", SearchInput);
