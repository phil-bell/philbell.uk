import { LitElement, html, css } from "lit-element"
import "../inputs/search-input"

export class PlexForm extends LitElement{


    static get styles() {
        return css`
            :host{
                width: 100%;
            }
            .plex-form__container{
                display: flex;
                justify-content: center;
                width: 100%;
                padding: 10px;
            }
        `
    }

    render(){
        return html`
            <div class="plex-form__container">
                <search-input></search-input>
            </div>
        `
    }
}

customElements.define("plex-form", PlexForm);
