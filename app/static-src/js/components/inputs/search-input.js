import { LitElement, html, css } from "lit-element";
import Cookies from "js-cookie";
import "../progress/loading-spinner.js";

export class SearchInput extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 520px;
        height: 56px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: start;
      }

      [invisible] {
        visibility: hidden;
      }

      .search__container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        overflow: hidden;
      }
      .search__label {
        margin: 0;
        padding: 0;
        font-size: 16px;
        position: relative;
        bottom: 27px;
        left: 0;
        -o-transition: 0.2s ease all;
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
        border-right: 0;
        border-radius: 8px 0 0 8px;
        height: 36px;
        width: 440px;
        text-align: center;
        -webkit-transition: border-color 0.25s ease-in-out;
        -o-transition: border-color 0.25s ease-in-out;
        transition: border-color 0.25s ease-in-out;
        overflow: hidden;
        padding: 0;
      }
      .search__input:hover:not(:focus) {
        color: var(--hover-color);
      }
      .search__input:hover ~ .search__label {
        color: var(--hover-color);
      }
      .search__input:focus {
        border: 1px solid var(--hover-color);
        border-right: 0;
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

      .search__button {
        font-size: 16px;
        color: var(--secondary-color);
        background: var(--primary-color);
        border: 1px solid var(--secondary-color);
        border-radius: 0 8px 8px 0;
        padding: 5px;
        font-family: var(--font-family);
        -webkit-font-smoothing: antialiased;
        font-weight: 500;
        min-width: 74px;
        height: 38px;
        padding: 0;
      }

      .search__button:hover {
        border: 1px solid var(--hover-color);
      }
      .search__button:active {
        color: var(--hover-color);
        outline: none;
      }
      .search__button:focus {
        outline: none;
      }

      @media only screen and (max-width: 725px) {
        :host {
          margin-left: 68px;
        }
        .search__input {
          overflow: visible;
        }
        .search__container {
          overflow: visible;
        }
        .search__input:focus ~ .search__label{
          display: none;
        }
        .search__input:not(:placeholder-shown) ~ .search__label{
          display: none;
        }
      }
    `;
  }

  constructor() {
    super();
    this.loading = false;
    this.value = "";
  }

  static get properties() {
    return {
      loading: {
        type: Boolean,
        attribute: "loading",
      },
      value: {
        type: String,
      },
    };
  }

  render() {
    return html`
      <div class="search__container">
        <input
          id="search-input"
          class="search__input"
          placeholder=" "
          type="text"
          @change=${(event) => (this.value = event.target.value)}
          @keyup=${(event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
              this.handleSearch();
            }
          }}
        />
        <label class="search__label" for="search-input">search</label>
      </div>
      <button
        class="search__button"
        @click=${() => {
          this.handleSearch();
        }}
      >
        ${this.loading ? html`<loading-spinner></loading-spinner>` : "go"}
      </button>
    `;
  }

  async handleSearch() {
    if (this.value) {
      this.loading = true;
      await fetch(window.location.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({ term: this.value }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          const table = document.querySelector("add-table");
          table.updateTable(data);
          await table.updateComplete;
          const rows = table.shadowRoot.firstElementChild.children;
          for (let row of rows) {
            row.fitContent = false;
            row.open = false;
          }
        });
      this.loading = false;
    }
  }
}

customElements.define("search-input", SearchInput);
