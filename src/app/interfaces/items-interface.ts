export interface ItemsInterface {
    id: number;
    value: string;
    completed: boolean;
    child?: ItemsInterface[];
}
