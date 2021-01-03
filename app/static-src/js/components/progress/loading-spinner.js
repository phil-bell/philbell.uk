import { html, css, LitElement } from "lit-element";

export class LoadingSpinner extends LitElement {
  static get styles() {
    return css`
      :host .loading-spinner__container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .loading-spinner__spinner {
        pointer-events: none;
        width: 15px;
        height: 15px;
        border: 2px solid transparent;
        border-color: var(--hover-color);
        border-top-color: var(--primary-color);
        border-radius: 50%;
        -webkit-animation: loadingspin 1s linear infinite;
        animation: loadingspin 1s linear infinite;
      }

      @-webkit-keyframes loadingspin {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      @keyframes loadingspin {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
    `;
  }
  render() {
    return html`
      <div class="loading-spinner__container">
        <div class="loading-spinner__spinner"></div>
      </div>
    `;
  }
}

customElements.define("loading-spinner", LoadingSpinner);
