import React from "react";
import styled from 'styled-components';

const AnimatedBloc = styled.div`
    //position: absolute;
    margin-bottom: 20px;
    width: ${props => props.mouseEnter ? props.start : props.end};
    height: 20px;
    background-color: ${props => props.color};
    opacity: .4;
    transition: .3s all ease-in;
    margin-top: ${props => props.mt};
`;

const Text = styled.p`
	position: ${ props => props.position ? props.position : `relative` };
    font-family: system-ui;
	text-align: ${ props => props.textAlign === true ? `center` : null };
	width: ${ props => props.width };
  margin-left: ${props => props.ml};
	font-size: ${ props => props.fontSize ? props.fontSize : ".7rem" };
	color: ${ props => props.color ? props.color : "black" };
	font-weight: ${ props => props.fontWeight } !important;
	letter-spacing: ${ props => props.letterSpacing };
	text-transform: ${ props => props.textTransform };
	z-index: 1;
`

function AnimateTitle() {

    const [mouseEnter, setMouseEnter] = React.useState(false);

    return (
        <div>
            <Text   onMouseEnter={() => setMouseEnter(true)} 
                    onMouseLeave={() => setMouseEnter(false)} 
                    // position="absolute"
                    ml="5px" 
                    letterSpacing="10px" 
                    fontSize="1.3rem" 
                    textTransform="uppercase"
                    fontWeight="200">
                Liberty Form
            </Text>
            <AnimatedBloc mt="14px" color="#9B5599" start="0px" end="150px" mouseEnter={mouseEnter}></AnimatedBloc>
            <AnimatedBloc mt="34px" color="#4AC6D2" start="150px" end="0px" mouseEnter={mouseEnter}></AnimatedBloc>
        </div>
    )
}
export default AnimateTitle