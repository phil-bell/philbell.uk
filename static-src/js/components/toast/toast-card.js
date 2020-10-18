import { css, html, LitElement } from "lit-element"


export class ToastCard extends LitElement {
    static get styles() {
        return css`
            div{
                max-width: 230px;
                position: absolute;
                padding: 10px;
                right: var(--right, -250px);
                bottom: 10px;
                border: 1px solid;
                border-radius: 5px;
                transition: 0.5s ease all;
                -moz-transition: 0.5s ease all;
                -webkit-transition: 0.5s ease all;
            }
        `
    }

    static get properties() {
        return {
            message: String,
            type: String
        }

    }

    constructor() {
        super();
        this.message = ""
        this.type = ""
        this.showRight = "10px"
        this.hideRight = "-250px"
    }

    show(message = false) {
        if (message) {
            this.message = message
        }
        this.style.setProperty("--right", this.showRight)
    }

    hide(){
        this.style.setProperty("--right", this.hideRight)
    }

    render() {
        return html`
            <div @click=${this.hide}>
                ${this.message}
            </div>
        `
    }

}

customElements.define("toast-card", ToastCard)

