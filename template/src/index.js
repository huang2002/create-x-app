/// <reference types="super-x" />
import { h } from "./common.js";

X.appendChild(
    document.body,
    h('h1', { style: { 'text-align': 'center' } }, 'Hello, world!')
);
