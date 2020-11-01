import { LitElement, html, css } from "lit-element";
import { BaseTable } from "./base-table"
import "./results-table-row";

export class ResultsTable extends BaseTable {
  render() {
    return html`
      <div class="grid">
        ${this.rows.map((row) => {
          return html`
            <results-table-row
              file-name=${row[0]}
              seeds=${row[1].seeds}
              magnet=${row[1].link}
            ></results-table-row>
          `;
        })}
      </div>
    `;
  }
}

customElements.define("results-table", ResultsTable);
