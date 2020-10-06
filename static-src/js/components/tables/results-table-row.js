import { LitElement, html, css } from "lit-element";
import Cookies from "js-cookie";
import nameToImdb from "name-to-imdb";

export class ResultsTableRow extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .grid__row {
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: 1fr;
        // border-bottom: 1px solid var(--font-color);
        overflow: hidden;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
      }
      .grid__row__info {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr;
        height: 40px;
      }
      .grid__row__form {
        display: grid;
        justify-items: end;
        grid-auto-flow: column;
        grid-template-columns: 1fr;
        height: 40px;
      }
      .grid__row:hover {
        color: var(--hover-color);
        border-bottom: 1px solid var(--hover-color);
      }
      .grid__cell {
        padding: 10px;
        align-self: center;
      }
      .show-form {
        height: 80px;
      }
      .hide-form {
        height: 40px;
      }
      button {
        color: var(--font-color);
        background: var(--bg-color);
        border: 1px solid var(--bg-color);
        border-radius: 5px;
        padding: 5px;
        font-family: var(--font-family);
        -webkit-font-smoothing: antialiased;
        font-weight: 500;
        min-width: 74px;
      }
      button:hover {
        border: 1px solid var(--hover-color);
      }
      button:active {
        color: var(--hover-color);
        outline: none;
      }
      button:focus {
        outline: none;
      }
      input {
        color: var(--font-color);
        background: var(--bg-color);
        border: 1px solid var(--font-color);
        border-radius: 5px;
        width: auto;
        height: 22px;
        outline: none;
      }
      select {
        color: var(--font-color);
        background: var(--bg-color);
        border: 1px solid var(--font-color);
        border-radius: 5px;
        height: 25px;
        font-family: var(--font-family);
        -webkit-font-smoothing: antialiased;
        font-weight: 500;
        outline: none;
      }
    `;
  }

  constructor() {
    super();
    this.fileName = "";
    this.seeds = "";
    this.magnet = "";
    this.location = "";
    this.open = false;
    this.type = "";
  }

  static get properties() {
    return {
      fileName: {
        type: String,
        attribute: "file-name",
      },
      seeds: {
        type: String,
        attribute: "seeds",
      },
      magnet: {
        type: String,
        attribute: "magnet",
      },
      type: {
        type: String,
      },
      open: {
        type: Boolean,
      },
    };
  }

  render() {
    return html`
      <div class="grid__row ${this.open ? "show-form" : "hide-form"}">
        <div class="grid__row__info">
          <div class="grid__cell">${this.fileName}</div>
          <div class="grid__cell">${this.seeds}</div>
          <div class="grid__cell">
            <button @click=${(e) => (this.open = !this.open)}>
              ${this.open ? "close" : "download"}
            </button>
          </div>
        </div>
        <div class="grid__row__form">
          <div class="grid__cell">
            <select @change=${(e) => (this.type = e.target.value)}>
              <option>--</option>
              <option value="movie">Movie</option>
              <option value="tv">TV</option>
              <option value="audiobook">Audiobook</option>
            </select>
          </div>
          <div class="grid__cell" .hidden=${this.type !== "tv"}><input /></div>
          <div class="grid__cell">
            <button @click=${this.handleDownload}>download</button>
          </div>
        </div>
      </div>
    `;
  }

  async handleDownload(event) {
    await fetch(`${window.location.origin}/api/download/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        name: this.fileName,
        magnet: this.magnet,
        location: this.location,
      }),
    }).then((response) => console.log(response));
  }
}

customElements.define("results-table-row", ResultsTableRow);
