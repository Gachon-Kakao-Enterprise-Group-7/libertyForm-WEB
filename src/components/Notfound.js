import React from 'react';
import NotfoundStyle from '../styles/NotfoundStyle';
import { Link } from 'react-router-dom'

function Notfound() {
    return (
        <>
        <NotfoundStyle />
        <body>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>Oops!</h1>
                        <h2>404 - The Page can't be found</h2>
                    </div>                    
                    <Link to="/">Go TO Homepage</Link> {/* a태그의 href대신에 리액트에서는 성능을 위해 react-router-dom의 Link를 사용한다. */}
                </div>
            </div>
        </body>
        </>
    );
}

export default Notfound;