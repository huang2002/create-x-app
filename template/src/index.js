/// <reference types="super-x" />
import { h } from "./common.js";

document.body.appendChild(
    h(
        'h1',
        {
            style: {
                marginTop: '3em',
                textAlign: 'center'
            }
        },
        'Hello, world!'
    )
);
