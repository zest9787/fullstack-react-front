
const initialState = {
    theme: 'light',
    lang: 'ko',
    menus: [

    ]
}
const commonReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default commonReducer;