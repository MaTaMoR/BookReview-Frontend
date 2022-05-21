import {CategoryResponse} from "../../books/interfaces/interfaces";

export interface SearchData {
    search: string;
    categories: CategoryResponse[];
}

