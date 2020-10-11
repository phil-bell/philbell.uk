import { css, html, LitElement } from "lit-element"


export class ToastCard extends LitElement {
    static get styles() {
        return css`
            div{
                position: absolute;
                padding: 10px;
                bottom: 10px;
                right: 10px;
                border: 1px solid;
                border-radius: 5px;
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
        this.hide = true
    }

    show(message = false) {
        if (message) {
            this.message = message
        }
        this.hide = !this.hide
        window.setTimeout(() => this.hide = !this.hide, 2000)
    }

    render() {
        return html`
            <div .hidden=${this.hide}>
                ${this.message}
            </div>
        `
    }

}

customElements.define("toast-card", ToastCard)

