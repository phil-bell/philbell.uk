import { html, css } from "lit-element";
import { BaseTable } from "./base-table";
import "./progress-row";
import "../progress/loading-state";

export class ProgressTable extends BaseTable {
  static get styles() {
    return css`
      :host{
        padding-top: 84px;
        padding-left: 19px;
      }
    `;
  }
  async getList() {
    await fetch(`/api/progress-list`)
      .then((response) => response.json())
      .then((data) => (this.rows = data.torrents));
  }

  async poll() {
    await this.getList();
    this.loading = false;
    console.log(this.loading);
    while (true) {
      await this.getList();
      await this.wait();
    }
  }

  wait(ms = 1000) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async startPoll() {
    await this.poll();
  }

  connectedCallback() {
    this.loading = true;
    console.log(this.loading);
    this.startPoll();
    super.connectedCallback();
  }

  render() {
    if (this.loading) {
      return html` <loading-state></loading-state> `;
    } else {
      return html`
        <div class="grid">
          ${this.rows.map((row) => {
            return html`
              <progress-row
                .hash=${row[1].hash}
                .state=${row[1].state}
                .filename=${row[1].name}
                .progress=${row[1].progress}
              >
              </progress-row>
            `;
          })}
        </div>
      `;
    }
  }
}

customElements.define("progress-table", ProgressTable);
