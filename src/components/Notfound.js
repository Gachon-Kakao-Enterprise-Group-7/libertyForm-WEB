import React from 'react';
import NotfoundStyle from '../styles/NotfoundStyle';

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
                    <a href="/">Go TO Homepage</a>
                </div>
            </div>
        </body>
        </>
    );
}

export default Notfound;