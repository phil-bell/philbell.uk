import { LitElement, html, css } from "lit-element"
import Cookies from 'js-cookie'


export class SearchInput extends LitElement{

    static get styles() {
        return css`
            :host{
                width: 100%;
                display: flex;
                justify-content: center;
            }
            :host .search__container{
                width: 100%;
                display: flex;
                flex-direction: column;

            }
            :host .search__label{
                font-size: 16px;
                position: relative;
                bottom: 27px;
                margin: auto;
                left: 0;
                transition: 0.2s ease all;
                -moz-transition: 0.2s ease all;
                -webkit-transition: 0.2s ease all;

            }
            :host .search__input{
                font-size: 16px;
                font-family: var(--font-family);
                -webkit-font-smoothing: antialiased;
                background: var(--bg-color);
                color: var(--font-color);
                border: 1px solid var(--font-color);
                border-radius: 8px;
                height: 35px;
                width: 50%;
                text-align: center;
                margin: auto;
                transition: border-color 0.25s ease-in-out;
            }
            :host .search__input:hover:not(:focus){
                color: var(--hover-color);
            }
            :host .search__input:hover ~ .search__label{
                color: var(--hover-color);
            }
            :host .search__input:focus{
                border: 1px solid var(--hover-color);
                outline: none;
            }
            :host .search__input:focus ~ .search__label{
                left: 28%;
                color: var(--font-color);
            }
            :host .search__input:not(:placeholder-shown) ~ .search__label{
                left: 28%;
                color: var(--font-color);
                cursor: pointer;
            }
            :host .search__label:hover{
                color: var(--hover-color) !important;
            }
        `
    }

    render(){
        return html`
        <div class="search__container">
            <input
                id="search-input"
                class="search__input"
                placeholder=" "
                type="text"
                @keyup="${(event) => {
                    console.log(event.target.value)
                    this.handleKeyUp(event.target.value)
                }}"
            >
            <label class="search__label" for="search-input">search</label>
        </div>
        `
    }

    async handleKeyUp(value){
        self.result = await fetch(window.location.href, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get("csrftoken")
              },
            body: JSON.stringify({"term": value}),
        })
        .then(response => response.json())
        console.log(self.result)
    }
}

customElements.define("search-input", SearchInput);
