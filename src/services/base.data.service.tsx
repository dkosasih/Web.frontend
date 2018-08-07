import { Observable } from "rxjs";

export class ServerResponse {
    validationResults: ValidationResult[];
    success: boolean;
}

export class ValidationResult {
    memberNames: string[];
    errorMessage: string;
}

export class ActionResult<T>{
    action: T;
    actionMessages: string[];
    isSuccess: boolean;
    is500Error:boolean

    constructor(actionMessage: any, isSuccess: boolean, is500Error: boolean) {
        // make it array if it's not array
        if (actionMessage != null && actionMessage.length) {
            this.actionMessages = [...actionMessage];
        } else {
            this.actionMessages = [actionMessage];
        }

        this.isSuccess = isSuccess;
        this.is500Error = is500Error;
    }
}

interface IDataService {
    get<T>(data: any): Observable<T>;
    getWithCredential<T>(data: any): Observable<T>;
    postWithCredential(data: any): Observable<ServerResponse> ;
}

export class BaseService  implements IDataService {
    get<T>(data: any): Observable<T> {
        throw new Error("Method not implemented.");
    }
    getWithCredential<T>(data: any): Observable<T> {
        throw new Error("Method not implemented.");
    }
    postWithCredential(data: any): Observable<ServerResponse> {
        throw new Error("Method not implemented.");
    }

}