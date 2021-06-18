import React from 'react';
import axios from 'axios';

export const StateContext = React.createContext();
const {Provider} = StateContext;

export const StateProvider = props => {
    const [isLogged, setIsLogged] = React.useState(true);

    React.useEffect(() => {
        //
    }, []);
    
    const setLoginState = (action) => {
        if(action === 'LOGGED_IN') {
            setIsLogged(true);
        } else if(action === 'LOGGED_OUT') {
            setIsLogged(false);
        } else {
            return null;
        }
    }
    
    return (
        <Provider value={{...{isLogged: isLogged}, setLoginState}}>
            {props.children}
        </Provider>
    );
}

