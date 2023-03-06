import React from 'react';
import MiddleWare from './MiddleWare';
import store from '../components/store';
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from 'react-redux'





export default function Root({ children }) {

    return (


        <>
            <Provider store={store}>
                <MiddleWare>
                    {children}
                </MiddleWare>
            </Provider>

        </>)

}
