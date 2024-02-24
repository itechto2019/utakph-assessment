namespace Model {
    export type Products = {
        uid?: string;
        name: string;
        category: string;
        options?: string[];
        price: number;
        cost: number;
        stock: number;
        createdAt?: Date;
        updatedAt?: Date;
    }
}