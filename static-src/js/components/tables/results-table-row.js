import { LitElement, html, css } from "lit-element";
import Cookies from "js-cookie";

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
        border-bottom: 1px solid var(--bg-color);
        overflow: hidden;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
        height: 40px
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
      [open] {
        height: 80px;
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
    this._fileName = "";
    this._type = "";
    this.seeds = "";
    this.magnet = "";
    this.open = false;
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
      _type: {
        type: String,
      },
      autoType: {
        type: String,
      },
      open: {
        type: Boolean,
      },
    };
  }

  set fileName(value) {
    this._fileName = value.replaceAll(".", " ");
  }

  get fileName() {
    return this._fileName;
  }

  get strippedFileName() {
    return this.fileName
      .match(/[^\(,\[,\-,:]*/i)[0]
      .split("S0")[0]
      .trim();
  }

  get location() {
    if (this.type == "tv") {
      return `${this.type}/${this.strippedFileName}/`;
    }
    return `${this.type}/`;
  }

  set type(value) {
    if (value == "movie") {
      this._type = "movies";
    } else if (value == "series") {
      this._type = "tv";
    } else {
      this._type = value;
    }
  }

  get type() {
    return this._type;
  }

  render() {
    return html`
      <div class="grid__row" ?open=${this.open}>
        <div class="grid__row__info">
          <div class="grid__cell">${this.fileName}</div>
          <div class="grid__cell">${this.seeds}</div>
          <div class="grid__cell">
            <button @click=${this.toggleRow}>
              ${this.open ? "close" : "download"}
            </button>
          </div>
        </div>
        <div class="grid__row__form">
          <div class="grid__cell">
            <select @change=${(e) => (this.type = e.target.value)}>
              <option>--</option>
              <option ?selected=${this.type == "movies"} value="movie">
                Movie
              </option>
              <option ?selected=${this.type == "tv"} value="tv">TV</option>
              <option value="audiobook">Audiobook</option>
            </select>
          </div>
          <div class="grid__cell" .hidden=${this.type !== "tv"}>
            <input value=${this.strippedFileName} />
          </div>
          <div class="grid__cell">
            <button @click=${this.handleDownload}>download</button>
          </div>
        </div>
      </div>
    `;
  }

  async toggleRow(event) {
    this.open = !this.open;
    console.log(this.strippedFileName);
    await fetch(
      `http://www.omdbapi.com/?apikey=691083f6&s=${this.strippedFileName}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.type = data.Search[0].Type;
      });
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
    })
      .then((data) => {
        document
          .querySelector("toast-card")
          .show("Your file is being downloaded");
      })
      .catch((error) => {
        document
          .querySelector("toast-card")
          .show("There has been a problem downloading your file");
      });
  }
}

customElements.define("results-table-row", ResultsTableRow);
