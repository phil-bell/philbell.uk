import { LitElement, html, css } from "lit-element"
import Cookies from 'js-cookie'


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
                                <td><button @click=${this.handleDownload} data-name="${row[0]}" data-magnet="${row[1].link}">download</button></td>
                            </tr>
                        `
                    })}
                </tbody>
            </table>
        `
    }

    async handleDownload(event){
        console.log(event.target.dataset)
        await fetch(`${window.location.origin}/api/download/`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': Cookies.get("csrftoken")
            },
            body: JSON.stringify({
                "name": event.target.dataset.name,
                "magnet": event.target.dataset.magnet,
                "location": "downloads/"
            }),
        })
        .then(response => console.log(response))
    }
}

customElements.define("results-table", ResultsTable);