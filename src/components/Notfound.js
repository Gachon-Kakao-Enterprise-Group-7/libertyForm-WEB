import React from 'react';
import styled from 'styled-components';
import notfound from '../img/404.PNG'



const Photodiv = styled.div`
    background-image: url(${notfound});
    margin:auto;
    height:60vh;
    background-size: cover;
    background-repeat: no-repeat;

`

function Notfound() {
    return (
        <Photodiv />
    );
}

export default Notfound;