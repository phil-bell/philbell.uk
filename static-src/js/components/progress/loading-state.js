import { html, css, LitElement } from "lit-element";

export class LoadingState extends LitElement {
  static get styles() {
    return css`
    .box {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 80vh;
        text-align: center;
        position: relative;
      }
      .box_container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 10px;
        height: 10px;
        z-index: initial;
      }
      .box_content {
        font-size: 40px;
        font-family: var(--font-family);
        font-weight: bold;
        position: relative;
        color: var(--primary-color);
        font-weight: 500;
        z-index: 1;
        text-align: left;
        -webkit-font-smoothing: antialiased;
      }
      .box_content:before {
        content: "loading";
        position: absolute;
        color: var(--hover-color);
        z-index: -1;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        animation: glitch 2.9s infinite;
      }
      .box_content:after {
        content: "loading";
        position: absolute;
        color: var(--secondary-color);
        width: 100%;
        height: 100%;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        z-index: -1;
        animation: glitch 3s infinite;
      }

      @keyframes glitch {
        0% {
          content: "loading";
          left: -2px;
          top: -2px;
        }
        25% {
          content: "loading";
          left: 2px;
          top: 0px;
        }
        50% {
          content: "loading.";
          left: -1px;
          top: 2px;
        }
        75% {
          content: "loading..";
          left: 1px;
          top: -1px;
        }
        100% {
          content: "loading...";
          left: 0px;
          top: -2px;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="box">
        <div class="box_container">
          <p class="box_content">loading...</p>
        </div>
      </div>
    `;
  }
}

customElements.define("loading-state", LoadingState);
