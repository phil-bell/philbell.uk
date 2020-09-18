import {LitElement, html, css} from 'lit-element';

export class PhilNavBar extends LitElement{
    static get styles() {
        return css`
        `;
    }
    render() {
        return html`
            <div>
                <div>Home</div>
                <div>Resume</div>
                <div>Plex</div>
                <div>Admin</div>
            </div>
        `;
    }

}

customElements.define('phil-nav-bar', PhilNavBar);
