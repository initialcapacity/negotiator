import {customElement} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement('flashing-dots')
export class FlashingDotsComponent extends LitElement {
    static styles = css`
      :host {
        display: flex;
        gap: 5px;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #ffffff;
        animation: dot-flashing 1s infinite linear alternate;
      }

      .dot.left {
        animation-delay: 0s;
      }

      .dot.middle {
        animation-delay: .5s;
      }

      .dot.right {
        animation-delay: 1s;
      }

      @keyframes dot-flashing {
        0% {
          background-color: #ffffff;
        }
        50%, 100% {
          background-color: #ffffff33;
        }
      }
    `

    render = () => html`
            <div class="left dot"></div>
            <div class="middle dot"></div>
            <div class="right dot"></div>
        `;
}
