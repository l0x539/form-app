type Category = {
    id?: number,
    name: string,
    category?: {
        id?: number,
        name?: string,
        options?: {}
    }
}

export interface Payload {
    name: string,
    applied_to: string,
    rate: number,
    applicable_items: number[]
  }

export const isCategory = (
    category: number | string | Category | object | null | boolean
): category is Category => {
    return category?category.hasOwnProperty('name'):false;
};

export interface Categories {
    [category: string]: number | string | Category | object | null | boolean;
}