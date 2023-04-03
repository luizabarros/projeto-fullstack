import styled from "styled-components"

const Container = styled.ul`
    max-width: 1200px;
    height: 100vh;
    margin: 0 auto;
    list-style: none;
    padding: 20px;
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    font-variant: small-caps;
    align-items: center;
    
    li {
        font: var(--title-1);
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
        border: 2px solid var(--grey-1);
        border-radius: 15px;
        padding: 20px;
    }

    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        inset: 0;
        z-index: 1000;
        width: 100vw;
        height: 100vh;
        background: var(--modal-bg);
    }

    .modal li {
        background: var(--grey-0);
    }
`
export default Container