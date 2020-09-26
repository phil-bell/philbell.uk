import { LitElement, html, css } from "lit-element"

export class ResultsTable extends LitElement{

    static get styles(){
        return css`
            table, th, td {
                border: 1px solid var(--font-color);
            }
        `
    }

    constructor(){
        super()
        this._rows = []
    }

    static get properties() {
        return {
          rows: {type: Object}
        };
      }

    updateTable(results){
        console.log(results)
        this.rows = results.rows
    }

    set rows(val){
        let oldVal = this._rows
        this._rows = Object.entries(val)
        this.requestUpdate('rows', oldVal);
    }

    get rows(){
        return this._rows
    }

    render(){
        return html`
            <table>
                <tbody>
                    ${this.rows.map((row) => {
                        return html`
                            <tr>
                                <td>${row[0]}</td>
                                <td>${row[1].seeds}</td>
                                <td>${row[1].target}</td>
                                <td>${row[1].link}</td>
                            </tr>
                        `
                    })}
                </tbody>
            </table>
        `
    }
}

customElements.define("results-table", ResultsTable);