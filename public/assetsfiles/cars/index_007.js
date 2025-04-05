import { initializeStore, SeamlessConnection } from '@seamless/store';

var dispatchers;
(function (dispatchers) {
    dispatchers["addPersonalisationData"] = "addPersonalisationData";
    dispatchers["addItemsToShow"] = "addSliderItems";
})(dispatchers || (dispatchers = {}));
var stateProps;
(function (stateProps) {
    stateProps["data"] = "personalisationData";
    stateProps["itemsToShow"] = "itemsToShow";
})(stateProps || (stateProps = {}));

const ADD_ITEMS_TO_SHOW = 'addSliderItems';
const addItemsToShowReducer = (state, action) => {
    if (action.payload) {
        const existingItem = state.find(item => item.componentId === action.payload.componentId);
        if (existingItem) {
            const itemsToShow = [
                ...existingItem[stateProps.itemsToShow],
                ...action.payload[stateProps.itemsToShow],
            ];
            const newitemsToShow = itemsToShow.filter((el, index) => itemsToShow.indexOf(el) === index);
            existingItem[stateProps.itemsToShow] = newitemsToShow;
        }
        else {
            state.push(action.payload);
        }
    }
    return [...state];
};

const ADD_PERSONALISATION_DATA = 'addPersonalisationData';
const addPersonalisationDataReducer = (state, action) => {
    if (action.payload) {
        if(state.length > 0) {
            state.push(action.payload);
        }else{
            state = [action.payload];
        }
    }
    return [...state];
};

const OWC_PERSONALISATION_CONNECTION = 'OWC_PERSONALISATION_DATA';
const initialState = [];
const store = initializeStore();
class OWCPersonalisationConnection extends SeamlessConnection {
    constructor() {
        super(OWC_PERSONALISATION_CONNECTION);
    }
    get initialState() {
        return initialState;
    }
    getReducer() {
        return (state, action) => {
            if (action.type === this.getActionType(ADD_PERSONALISATION_DATA)) {
                return addPersonalisationDataReducer(state, action);
            }
            else if (action.type === this.getActionType(ADD_ITEMS_TO_SHOW)) {
                return addItemsToShowReducer(state, action);
            }
            return state;
        };
    }
    getPublicDispatchers() {
        return {
            addPersonalisationData: (payload) => this.getAction(dispatchers.addPersonalisationData, payload),
            addItemsToShow: (payload) => this.getAction(dispatchers.addItemsToShow, payload),
        };
    }
}
const addPersonalisationConnection = () => store.addConnection(new OWCPersonalisationConnection());

addPersonalisationConnection();
