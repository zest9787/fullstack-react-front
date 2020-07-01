
const initialState = {
    theme: 'light',
    lang: 'ko',
    menus: null,
    tabMenus: [],
    currentMenu: '',
    activeKey: ''
}
const commonReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_MENU':
            /*let mergeMenus = state.tabMenus == undefined ? [action.menu] : [...state.tabMenus, action.menu];
            const hashMenu = {};
            let newMenus = mergeMenus.reduce((prev, next) => {
                if (!hashMenu[next.id]){
                    hashMenu[next.id] = true;
                    return next;
                }
                return prev;
            }, []);
            console.log('new Menus : ', newMenus);*/
            let newMenus = state.tabMenus;
            const existMenu = state.tabMenus.find(menu => menu.id === action.menu.id);
            if (!existMenu) newMenus.push(action.menu);
            return {
                ...state,
                activeKey: action.menu.id,
                tabMenus: newMenus
            };
        case 'REMOVE_MENU':
            return state.tabMenus.filter(menu => menu.id !== action.id);
        case 'TAB_CHANGE':
            return {
                ...state,
                activeKey: action.id
            }
        default:
            return state;
    }
}

export default commonReducer;