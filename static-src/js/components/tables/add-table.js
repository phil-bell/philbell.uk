import { LitElement, html, css } from "lit-element";
import { BaseTable } from "./base-table";
import "./add-row";

export class AddTable extends BaseTable {
  render() {
    return html`
      <div class="grid">
        ${this.rows.map((row) => {
          return html`
            <add-row
              file-name=${row[0]}
              seeds=${row[1].seeds}
              magnet=${row[1].link}
            ></add-row>
          `;
        })}
      </div>
    `;
  }
}

customElements.define("add-table", AddTable);
