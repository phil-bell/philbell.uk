import { html } from "lit-element";
import { BaseTable } from "./base-table";
import "./progress-row";

export class ProgressTable extends BaseTable {
  async getList() {
    await fetch(`/api/progress-list`)
      .then((response) => response.json())
      .then((data) => (this.rows = data.torrents));
  }

  async poll() {
    await this.getList();
    while (true) {
      await this.wait();
      await this.getList();
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
    this.startPoll();
    super.connectedCallback();
  }

  render() {
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

customElements.define("progress-table", ProgressTable);
