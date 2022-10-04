import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'; 
import background from "../../img/background.jpg"

import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardIcon,
  CardFieldset,
  CardInput,
  CardOptionsNote,
  CardButton,
  CardLink
} from "./Card";

const Backgrounddiv = styled.div` // styled components를 사용하여 div를 만듬
    background-image: url(${background});
    margin:0px;
    width:100vw;
    height:100vh;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.85;
`

function Signin() {
  return (
    <div className="Signin">
    {/* <Backgrounddiv> */}
      <CardWrapper>
        <CardHeader>
          <CardHeading>Sign in</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardInput placeholder="Username" type="text" required />
          </CardFieldset>

          <CardFieldset>
            <CardInput placeholder="E-mail" type="text" required />
          </CardFieldset>

          <CardFieldset>
            <CardInput placeholder="Password" type="password" required />
            <CardIcon className="fa fa-eye" eye small />
          </CardFieldset>

          <CardFieldset>
            <CardInput placeholder="Confirm Password" type="password" required />
            <CardIcon className="fa fa-eye" eye small />
          </CardFieldset>

          <CardFieldset>
            <CardInput placeholder="Phone" type="phone" required />
            <CardIcon className="number" required />
          </CardFieldset>

          <CardFieldset>
            <CardOptionsNote>Or sign up with</CardOptionsNote>
          </CardFieldset>


          <CardFieldset>
            <CardButton type="button">Sign Up</CardButton>
          </CardFieldset>

          <CardFieldset>
            <CardLink>I already have an account</CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
      {/* </Backgrounddiv> */}
      </div>
  );
}
export default Signin;