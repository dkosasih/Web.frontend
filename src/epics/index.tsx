import productEpics from 'epics/products.epic'
import { combineEpics } from "redux-observable";

const epics = combineEpics(
    ...productEpics
);

export default epics;