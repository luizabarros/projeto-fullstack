import styled  from "styled-components"

const Container = styled.div`
    box-shadow: 0px 4px 30px -10px var(--box-shadow);
    
    header {
        max-width: 800px;
        margin: 0 auto;
        padding: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        height: 80px;
        font: var(--title-3);
        text-align: center;
    }
`

export default Container