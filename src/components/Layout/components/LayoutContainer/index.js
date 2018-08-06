import React from 'react';
import styled from 'styled-components';

const Div = styled('div')`
    width: 80%;
    margin: auto;
    position: relative;
    background: rgb(255, 255, 255);
    box-shadow: rgb(204, 204, 204) 0px 1px 2px;
`;

const LayoutContainer = props => (
    <Div>
        {props.children}
    </Div>
)

export default LayoutContainer