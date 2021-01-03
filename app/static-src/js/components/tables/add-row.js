import { html, css } from "lit-element";
import Cookies from "js-cookie";
import { BaseTableRow } from "./base-row";

export class AddRow extends BaseTableRow {
  static get styles() {
    return [
      super.styles,
      css`
        .grid__row:hover {
          color: var(--hover-color);
          border-bottom: 1px solid var(--hover-color);
        }
        button {
          color: var(--secondary-color);
          background: var(--primary-color);
          border: 1px solid var(--primary-color);
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
          color: var(--secondary-color);
          background: var(--primary-color);
          border: 1px solid var(--secondary-color);
          border-radius: 5px;
          width: auto;
          height: 22px;
          outline: none;
        }
        select {
          background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+)
            no-repeat 95% 50%;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          color: var(--secondary-color);
          border: 1px solid var(--secondary-color);
          border-radius: 5px;
          height: 25px;
          font-family: var(--font-family);
          -webkit-font-smoothing: antialiased;
          font-weight: 500;
          outline: none;
          padding-left: 6px;
          padding-right: 15px;
        }
        @media only screen and (max-width: 725px) {
          input {
            width: 74px;
          }
        }
      `,
    ];
  }

  constructor() {
    super();
    this._fileName = "";
    this._type = "";
    this.seeds = "";
    this.magnet = "";
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

  async toggleRow(event) {
    this.open = !this.open;
    await fetch(
      `http://www.omdbapi.com/?apikey=691083f6&s=${this.strippedFileName}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.type = data.Search[0].Type;
      });
  }

  async handleDownload(event) {
    await fetch(`/api/download/`, {
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

  fitContentRow(event) {
    const formRow = event.target.parentElement.parentElement;
    const infoRow = formRow.previousElementSibling;
    const nameCell = infoRow.firstElementChild;
    const row = infoRow.parentElement;
    console.log(formRow);
    console.log(infoRow);
    console.log(nameCell);
    console.log(row);
    this.fitContent = !this.fitContent;
  }

  render() {
    return html`
      <div class="grid__row" ?fit-content=${this.fitContent} ?open=${this.open}>
        <div class="grid__row__info" ?fit-content=${this.fitContent}>
          <div class="grid__cell" ?fit-content=${this.fitContent}>
            ${this.fileName}
          </div>
          <div class="grid__cell">${this.seeds}</div>
          <div class="grid__cell--left">
            <button @click=${this.toggleRow}>
              ${this.open ? "close" : "download"}
            </button>
          </div>
        </div>
        <div class="grid__row__form">
          <div class="grid__cell">
            <button @click=${this.fitContentRow}>
              ${this.fitContent ? "less" : "more"}
            </button>
          </div>
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
}

customElements.define("add-row", AddRow);
