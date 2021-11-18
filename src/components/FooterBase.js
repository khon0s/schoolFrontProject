import React from 'react'
import styled from 'styled-components'

function FooterBase() {
    return (
        <Footers>
            <Lu>
                <Lis>Wladislaw (Néstor) Miszczuk</Lis>
                <Lis>w.m.almarza@gmail.com</Lis>
            </Lu>
        </Footers>
    )
}

export default FooterBase


const Footers = styled.div`
display: flex;
align-items: center;
justify-content: center;
position: absolute;
left: 0;
height: 100px;
width: 100%;
overflow: hidden;
`

const Lis = styled.li`
text-align: center;
list-style-type: none;
margin: 10px;
font-size: 20px;
font-weight: bold;
`

const Lu = styled.ul`
text-align: center;
list-style-type: none;
margin: 10px;
margin-right: 70px;
`