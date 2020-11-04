import { html, css, LitElement } from "lit-element";

export class ProgressBar extends LitElement {
  static get styles() {
    return css`
      :host {
        --progress: 0%;
      }
      .progress__container {
        width: 90%;
        background-color: var(--bg-color);
        padding: 3px;
        border-radius: 15px;
        border: 1px solid var(--font-color);
        transition: width 500ms ease-in-out;
      }

      .progress__bar {
        display: block;
        height: 8px;
        background-color: var(--hover-color);
        border-radius: 25px;
        width: var(--progress);
        transition: width 500ms ease-in-out;
      }
    `;
  }

  constructor() {
    super();
    this._progress = 0;
  }

  static get properties() {
    return {
      progress: {
        type: Number,
        attribute: "progress",
      },
    };
  }

  get progress() {
    return this._progress;
  }

  set progress(value) {
    let oldVal = this.progress;
    this._progress = value;
    this.style.setProperty("--progress", `${this.progress}%`);
    this.requestUpdate("progress", oldVal);
  }

  render() {
    return html`
      <div class="progress__container">
        <div class="progress__bar"></div>
      </div>
    `;
  }
}

customElements.define("progress-bar", ProgressBar);
