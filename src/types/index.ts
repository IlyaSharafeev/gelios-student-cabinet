export interface Step {
    id: number;
    name: string;
}

export interface Item {
    id: number;
    name: string;
}

export type Student = Item;
export type Trainer = Item;
export type Direction = Item;