import { html } from "lit-element";
import { BaseTable } from "./base-table";
import "./manage-table-row"

export class ManageTable extends BaseTable {

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

  render() {
    return html`
      <div class="grid">
        ${this.rows.map((row) => {
            console.log(row[1].progress)
            return html`
              <manage-table-row 
                .state=${row[1].state} 
                .filename=${row[1].name} 
                .progress=${row[1].progress}>
              </manage-table-row>
            `
        })}
      </div>
    `;
  }
}

customElements.define("manage-table", ManageTable);
