import { LitElement, html, css } from "lit-element";

export class ManageTable extends LitElement {
  static get styles() {
    return css`
      :host {
        margin-top: 50px;
        display: flex;
        justify-content: center;
      }
      .grid {
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
    this._rows = [];
    this._formRow = {};
  }

  static get properties() {
    return {
      rows: { type: Object },
    };
  }

  async getList(){
    await fetch(`${window.location.origin}/api/list`)
    .then((response) => response.json())
    .then((data) => this.rows = data.torrents)
  }

  async poll() {
    await this.getList();
    while (true) {
      await this.wait();
      await this.getList();
    }
  }
  
  wait(ms = 1000) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async startPoll(){
    await this.poll()
  }

  connectedCallback() {
    this.startPoll();
    super.connectedCallback();
  }

  updateTable(results) {
    this.rows = results.rows;
  }



  set rows(val) {
    let oldVal = this._rows;
    this._rows = Object.entries(val);
    this.requestUpdate("rows", oldVal);
  }

  get rows() {
    return this._rows;
  }

  render() {
    return html`
      <div class="grid">
        ${this.rows.map((row) => {
            return html`
                <div class="grid__row">
                  <div class="grid__row__info">
                    <div class="grid__cell">${row[1].name}</div>
                    <div class="grid__cell">${row[1].state}</div>
                    <div class="grid__cell">${Math.round(row[1].progress*100)}%</div>
                  </div>
                </div>
            `
        })}
      </div>
    `;
  }
}

customElements.define("manage-table", ManageTable);
