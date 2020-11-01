import { BaseTableRow } from "./base-row";
import { html, css } from "lit-element";
import "../progress/progress-bar"
import "../buttons/row-toggle-button"



export class ManageTableRow extends BaseTableRow{

    static get styles(){
        return [
            super.styles,
            css`
                .progress {
                color: yellow; 
              }
              
              .progress::-webkit-progress-value {
                background-color:yellow;
              }
              
              .progress::-moz-progress-bar {
                background-color:yellow;
              }
            `
        ]
    }

    constructor(){
        super()
        this.fileName = ""
        this._state = ""
        this._progress = ""
        this.states = {
            'allocating': "allocating",
            'checkingDL': "checking download",
            'checkingResumeData': "checking resume data",
            'checkingUP': "checking upload",
            'downloading': "downloading",
            'error': "error",
            'forcedUP': "forced upload",
            'forceDL': "force download",
            'metaDL': "metadata download",
            'missingFiles': "missing files",
            'moving': "moving",
            'pausedDL': "paused download",
            'pausedUP': "paused upload",
            'queuedDL': "queued download",
            'queuedUP': "queued upload",
            'stalledDL': "stalled download",
            'stalledUP': "stalled upload",
            'unknown': "unknown",
            'uploading': "uploading",
        }
    }

    static get properties(){
        return  {
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
        }
    }

    get state(){
        return this._state
    }
    
    get progress(){
        return this._progress
    }

    get raw_progress(){
        return this.progress.slice(0,-1)
    }

    set state(value){
        let oldVals = this.state
        this._state = this.states[value]
        this.requestUpdate("state", oldVals)
    }

    set progress(value){
        let oldVals = this.progress
        this._progress = `${Math.round(value*100)}%`
        this.requestUpdate("progress", oldVals)
    }

    render() {
        return html`
            <div class="grid__row">
                <div class="grid__row__info" ?open=${this.open}>
                    <div class="grid__cell">${this.filename}</div>
                    <div class="grid__cell"><progress-bar .progress=${this.raw_progress}></progress-bar></div>
                    <div class="grid__cell"><row-toggle-button @click=${() => this.open = !this.open}></row-toggle-button></div>
                </div>
            </div>
        `
    }
    
}

customElements.define("manage-table-row", ManageTableRow);
