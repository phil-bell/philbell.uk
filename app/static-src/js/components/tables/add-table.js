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
              file-name=${row[1].name}
              seeds=${row[1].seeders}
              magnet=${row[1].magnet}
            ></add-row>
          `;
        })}
      </div>
    `;
  }
}

customElements.define("add-table", AddTable);
