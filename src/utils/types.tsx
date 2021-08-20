export type InputSelection = {
    title: string,
    name: string,
    value: string
}

export interface Payload {
    name: string,
    applied_to: string,
    rate: number,
    applicable_items: number[]
}

type Category = {
    id?: number,
    name: string,
    category?: {
        id?: number,
        name?: string,
        options?: {}
    }
}

export interface FormValues {
    name: string,
    applied_to: string,
    rate: number,
    applicable_items: [],
    search: string,
    categories: Categories,
    searched: Categories
}

export const isCategory = (
    category: number | string | Category | object | null | boolean | Array<object>
): category is Category => {
    return category?category.hasOwnProperty('name'):false;
};

export const isIterable = (
    obj: number | string | Category | object | null | boolean | Array<object>
): obj is Array<object> => {
    return Symbol.iterator in Object(obj);
};

export interface Categories {
    [category: string]: number | string | Category | object | null | boolean;
}