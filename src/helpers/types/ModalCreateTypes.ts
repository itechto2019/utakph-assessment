namespace Form {
    export interface ErrorInterface {
        messages: string | string[];
        type: "success" | "danger" | "warning"
    }
    export type FormDataInputText = {
        name: string;
        value: string;
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
    export interface FormCreateArgs {
        name: string;
        category: string;
        price: string;
        cost: string;
        stock: string;
        options?: FormDataInputOption[]
    }
}