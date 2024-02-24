namespace Form {
    export interface ErrorInterface {
        messages: string | string[];
        type: "success" | "danger" | "warning"
    }
    export type FormDataInputText = {
        name: string;
        value: string;
        type: "text" | "number"
    }
    export type FormDataInputNumber = {
        name: string;
        value: number;
    }
    export type FormDataInputOption = {
        name: string;
        price?: string;
        stock: string;
        cost: string;
    }
    export type FormDataInterface = {
        name: FormDataInputText;
        category: FormDataInputText;
        options: FormDataInputOption[];
        price: FormDataInputNumber;
        cost: FormDataInputNumber;
        stock: FormDataInputNumber;
    }
    export type FormInput = {
        name: string;
        category: string;
        price: string;
        cost: string;
        stock: string;
        options?: string[]
    }
    export interface FormInputArgs {
        name: string;
        category: string;
        price: number;
        cost: number;
        stock: number;
        options?: string[]
    }
}