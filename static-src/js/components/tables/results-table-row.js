import {
    LitElement,
    html,
    css
} from "lit-element";
import Cookies from "js-cookie";

export class ResultsTableRow extends LitElement {
    static get styles(){
        return css`
            :host{
                display: flex;
                flex-direction: column;
            }

            .grid__row{
                display: grid;
                grid-auto-flow: row;
                grid-template-columns: 1fr;
                // border-bottom: 1px solid var(--font-color);
                overflow: hidden;
                height: 40px;
                transition: 0.2s ease all;
                -moz-transition: 0.2s ease all;
                -webkit-transition: 0.2s ease all;
            }
            .grid__row__info{
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: 1fr;
                height: 40px
            }
            .grid__row__form{
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: 1fr;
                height: 40px
            }
            .grid__row:hover{
                color: var(--hover-color);
                border-bottom: 1px solid var(--hover-color);
            }
            .grid__cell{
                padding: 10px;
                align-self: center;
            }
            button{
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
            button:hover{
                border: 1px solid var(--hover-color);
            }
            button:active{
                color: var(--hover-color);
                outline: none;
            }
            button:focus{
                outline: none;
            }
            input{
                color: var(--font-color);
                background: var(--bg-color);
                border: 1px solid var(--font-color);
                border-radius: 5px;
                width: 0;
            }
        `
    }

    constructor(){
        super()
        this.fileName = ""
        this.seeds = ""
        this.magnet = ""
        this.location = ""
        this.open = false
    }

    static get properties() {
        return {
            fileName: {
                type: String,
                attribute: "file-name"
            },
            seeds: {
                type: String,
                attribute: "seeds"
            },
            magnet: {
                type: String,
                attribute: "magnet"
            }
        };
    }

    render() {
        return html`
            <div class="grid__row">
                <div class="grid__row__info">
                    <div class="grid__cell">${this.fileName}</div>
                    <div class="grid__cell">${this.seeds}</div>
                    <div class="grid__cell">
                        <button data-open=${false} @click=${this.toggleForm}>
                            download
                        </button>
                    </div>
                </div>
                <div class="grid__row__form">
                    <div class="grid__cell">
                        <select>
                            <option>--</option>
                            <option value="movie">Movie</option>
                            <option value="tv">TV</option>
                            <option value="audiobook">Audiobook</option>
                        </select>
                    </div>
                    <div class="grid__cell"><input /></div>
                    <div class="grid__cell">
                        <button @click=${this.handleDownload}>
                            download
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    toggleForm(event) {
        if (this.open) {
            this.open = false
            this.firstElementChild = "40px"
            event.target.innerText = "download"
        } else {
            this.open = true
            this.formRow = event.target
            this.firstElementChild = "80px"
            event.target.innerText = "close"
        }
    }

    async handleDownload(event) {
        console.log(event.target.dataset)
        await fetch(`${window.location.origin}/api/download/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get("csrftoken")
            },
            body: JSON.stringify({
                "name": this.fileName,
                "magnet": this.magnet,
                "location": this.location
            }),
        })
            .then(response => console.log(response))
    }
}

customElements.define("results-table-row", ResultsTableRow);