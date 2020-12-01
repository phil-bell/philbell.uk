import { BaseTableRow } from "./base-row";
import { html, css } from "lit-element";
import "../progress/progress-bar";
import "../buttons/row-toggle-button";
import { Fetcher } from "../../util/fetch";

export class ProgressRow extends BaseTableRow {
  constructor() {
    super();
    this.fetcher = new Fetcher();
    this.filename = "";
    this._state = "";
    this._progress = "";
    this.states = {
      allocating: "allocating",
      checkingDL: "checking download",
      checkingResumeData: "checking resume data",
      checkingUP: "checking upload",
      downloading: "downloading",
      forcedUP: "forced upload",
      forceDL: "force download",
      metaDL: "metadata download",
      uploading: "uploading",
      moving: "moving",
      error: "error",
      missingFiles: "missing files",
      pausedDL: "paused download",
      pausedUP: "paused upload",
      queuedDL: "queued download",
      queuedUP: "queued upload",
      stalledDL: "stalled download",
      stalledUP: "stalled upload",
      unknown: "unknown",
    };
    this.stop_state = Object.values(this.states).splice(0, 9);
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          --progress: 0%;
        }
        .grid__row {
          position: relative;
        }
        .grid__row:hover {
          color: var(--hover-color);
        }
        .grid__row:hover:after {
          content: " ";
          position: absolute;
          border-bottom: 1px solid var(--hover-color);
          width: var(--progress);
          top: 39px;
          transition: 0.2s ease all;
          -moz-transition: 0.2s ease all;
          -webkit-transition: 0.2s ease all;
        }
        [not-complete]:after {
          content: " ";
          position: absolute;
          border-bottom: 1px solid var(--hover-color);
          width: var(--progress);
          top: 39px;
          transition: 0.2s ease all;
          -moz-transition: 0.2s ease all;
          -webkit-transition: 0.2s ease all;
        }
        [open]:after {
          top: 79px;
        }
        [open]:hover:after {
          top: 79px;
        }
      `,
    ];
  }

  static get properties() {
    return {
      hash: {
        type: String,
        attribute: "hash",
      },
      filename: {
        type: String,
        attribute: "filename",
      },
      state: {
        type: String,
        attribute: "state",
      },
      progress: {
        type: String,
        attribute: "progress",
      },
    };
  }

  set filename(value) {
    this._filename = value.replaceAll(".", " ");
  }

  get filename() {
    return this._filename;
  }

  get state() {
    return this._state;
  }

  get progress() {
    return this._progress;
  }

  get rawProgress() {
    return parseInt(this.progress.replace("%", ""));
  }

  get toggleState() {
    return this.stop_state.includes(this.state) ? "pause" : "resume";
  }

  set state(value) {
    let oldVals = this.state;
    this._state = this.states[value];
    this.requestUpdate("state", oldVals);
  }

  set progress(value) {
    let oldVals = this.progress;
    this._progress = `${Math.round(value * 100)}%`;
    this.style.setProperty("--progress", this._progress);
    this.requestUpdate("progress", oldVals);
  }

  handleToggle() {
    this.fetcher.post(`/api/${this.toggleState}-torrent/`, { hash: this.hash });
  }

  handleDelete() {
    this.fetcher.post("/api/delete-torrent/", { hash: this.hash });
  }

  render() {
    return html`
      <div
        class="grid__row"
        ?open=${this.open}
        ?not-complete=${this.rawProgress < 100}
      >
        <div class="grid__row__info">
          <div class="grid__cell">${this.filename}</div>
          <div class="grid__cell no-mobile">${this.progress}</div>
          <div class="grid__cell">
            <row-toggle-button @click=${() => (this.open = !this.open)}>
              ${this.open ? "close" : "open"}</row-toggle-button
            >
          </div>
        </div>
        <div class="grid__row__form">
          <div class="grid__cell">${this.state}</div>
          <div class="grid__cell">
            <row-toggle-button @click=${this.handleToggle}
              >${this.toggleState}</row-toggle-button
            >
          </div>
          <div class="grid__cell">
            <row-toggle-button @click=${this.handleDelete}
              >delete</row-toggle-button
            >
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("progress-row", ProgressRow);
