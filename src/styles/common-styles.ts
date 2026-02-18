// styles/common-styles.js
import { css } from 'lit';

const commonStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
  }

  .button {
    padding: 8px 16px;
    border-radius: 4px;
  }

  .text-center {
    text-align: center;
  }

  .btn {
    display: inline-block;
    background: var(--accent-colour);
    color: white;
    padding: 16px 32px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 18px;
    transition: all 0.3s;
  }

  .btn:hover {
    background: #b45309;
    transform: scale(1.05);
  }

  /* Section */
  section {
    padding: 80px 20px;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: bold;
    color: #1f2937;
    text-align: center;
    margin-bottom: 48px;
  }

  .spacer {
    height: 100vh;
    /* background-color: #000; */
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    &.small{
      height: 50vh;
    }
  }
`;
export { commonStyles };
