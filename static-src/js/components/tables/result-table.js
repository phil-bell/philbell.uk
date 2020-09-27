import { LitElement, html, css } from "lit-element"

export class ResultsTable extends LitElement{

    static get styles(){
        return css`
            :host{
                display: flex;
                justify-content: center;
            }
            table {
                width: 50%;
                border-collapse: collapse;
            }
            td{
                overflow: hidden;
                text-overflow: ellipsis;
                // max-width: 150px;
                padding: 10px;
                border-bottom: 1px solid var(--font-color);
            }
            tr:hover td{
                color: var(--hover-color);
                border-bottom: 1px solid var(--hover-color);
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
                                <td>${row[0].replaceAll(".", " ")}</td>
                                <td>${row[1].seeds}</td>
                                <td><a data-magnet="${row[1].link}">download</a></td>
                            </tr>
                        `
                    })}
                </tbody>
            </table>
        `
    }
}

customElements.define("results-table", ResultsTable);