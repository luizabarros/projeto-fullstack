import { createGlobalStyle } from "styled-components"

const Global = createGlobalStyle`
    :root {
        font-size: 62.5%;
        --color-primary: #FF577F;
        --color-primary-focus: #FF427F;
        --color-primary-disabled: #59323F;
        --grey-0: #F8F9FA;
        --grey-1: #868E96;
        --grey-2: #343B41;
        --grey-3: #212529;
        --grey-4: #121214;
        --success: #3FE864;
        --negative: #E83F5B;
        --white: #fff;
        --box-shadow: #64646f33;
        --modal-bg: #12121480;
        --font-family: "Inter", sans-serif;
        --title-1: 700 1.8rem var(--font-family);
        --title-2: 600 1.6rem var(--font-family);
        --title-3: 700 1.4rem var(--font-family);
        --headline: 400 1.2rem var(--font-family);
        --headline-bold: 600 1.2rem var(--font-family);
        --headline-shorter: 400 1rem var(--font-family);
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: 0;
        border: 0;
        line-height: 20px;
        text-decoration: none;
    }

    div#root {
        min-height: 800px;
    }

    body {
        background: var(--grey-0);
        overflow-x: hidden;
    }

    button, input, select, a {
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input {
        background: var(--grey-0);
        color: var(--black);
        height: 38px;   
        padding: 0 1.3rem;
        width: 100%;
    }

    input:hover, select:hover {
        color: var(--black);
        border: 1.22px solid var(--grey-0);
    }

    label, input, a {
        font: var(--headline);
    }

    label {
        color: var(--black);
    }

    button, a {
        cursor: pointer;
        padding: 0 2.2rem;
        color: var(--black);
    }

    img {
        max-width: 100%;
        object-fit: cover;
    }

    section {
        font: var(--title-2);
        background: var(--grey-1);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120vh;
        text-align: center;
        padding: 10px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
    }

    h1.kenziehub {
        font: var(--title-1);
        color: var(--color-primary);
    }

    p.error {
        color: var(--negative);
        font: var(--headline-shorter);
    }

    div.Toastify  {
        font: var(--headline);
    }

    div.Toastify button {
        width: 20px;
    }

    div.Toastify__toast-theme--light {
        background: var(--grey-2);
        color: var(--white);
    }

    .suggestion {
        margin-bottom: 10px;
    }
`

export default Global