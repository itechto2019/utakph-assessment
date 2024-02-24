namespace Model {
    export type OptionItem = {
        item_id?: string;
        name: string;
        price?: number;
        stock: number;
    }
    export type Products = {
        uid?: string;
        name: string;
        category: string;
        options?: OptionItem[];
        price: number;
        cost: number;
        stock: number;
        createdAt?: Date;
        updatedAt?: Date;
    }
}