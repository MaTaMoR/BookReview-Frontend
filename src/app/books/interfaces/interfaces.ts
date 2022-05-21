// --------------- SHARED ---------------

export enum FilterCriteria {

    EQUAL = "EQUAL",
    LIKE = "LIKE",
    GREATER = "GREATER",
    GREATER_EQUAL = "GREATER_EQUAL",
    LESS = "LESS",
    LESS_EQUAL = "LESS_EQUAL",
    AND = "AND",
    OR = "OR"

}

export enum OrderDirection {

    ASC = "ASC",
    DESC = "DESC"

}


// --------------- REQUESTS ---------------

export interface BookRequest {

    id?: string;
    title?: string;
    bookType?: string;
    publishedDate?: Date;
    totalPages?: number;

    autor?: AutorRequest;
    editorial?: EditorialRequest;
    categories?: CategoryRequest[];

    titleCriteria?: FilterCriteria;
    descriptionCriteria?: FilterCriteria;
    publishedDateCriteria?: FilterCriteria;
    totalPagesCriteria?: FilterCriteria;
    categoriesCriteria?: FilterCriteria;

}

export interface AutorRequest {

    id?: string;
    name?: string;
    surnames?: string;

    nameCriteria?: FilterCriteria;
    surnamesCriteria?: FilterCriteria;

}

export interface EditorialRequest {

    id?: String;
    name?: string;

    nameCriteria?: FilterCriteria;

}

export interface CategoryRequest {

    id?: string;
    name?: string;

    nameCriteria?: FilterCriteria;

}

export interface UserRequest {

    id?: string;
    username?: string;
    name?: string;
    surnames?: string;

    usernameCriteria?: FilterCriteria;
    nameCriteria?: FilterCriteria;
    surnamesCriteria?: FilterCriteria;

}

export interface ReviewRequest {

    id?: string;
    user?: UserRequest;
    book?: BookRequest;
    title?: string;
    review?: string;
    score?: number;
    reviewDate?: Date;

    titleCriteria?: FilterCriteria;
    reviewCriteria?: FilterCriteria;
    scoreCriteria?: FilterCriteria;
    reviewDateCriteria?: FilterCriteria;

}


export interface OrderRequest {

    direction: OrderDirection;
    property: string;

}

export interface SortRequest {

    orders: OrderRequest[];

}

export interface PageableRequest {

    page: number;
    size: number;
    sort?: SortRequest;

}

export interface FilterRequest<T> {

    filter: T;
    page: PageableRequest;

}

// --------------- RESPONSES ---------------

export interface BookResponse {

    id: string;
    title: string;
    bookType: string;
    publishedDate: Date;
    totalPages: number;
    image: string;

    autor: AutorRequest;
    editorial: EditorialRequest;
    categories: CategoryRequest[];

}

export interface AutorResponse {

    id: string;
    name: string;
    surnames: string;

}

export interface EditorialResponse {

    id: String;
    name: string;

}

export interface CategoryResponse {

    id: string;
    name: string;

}

export interface UserResponse {

    id: string;
    username: string;
    name: string;
    surnames: string;

}

export interface ReviewResponse {

    id: string;
    user: UserRequest;
    book: BookRequest;
    title: string;
    review: string;
    image: string;
    score: number;
    reviewDate: Date;

}

export interface OrderResponse {

    direction: OrderDirection;
    property: string;

}

export interface SortResponse {

    orders: OrderResponse[];

}

export interface PageableResponse {

    page: number;
    size: number;
    totalElements: number;
    sort: SortResponse;

}

export interface PageResponse<T> {

    content: T[];
    page: PageableResponse;

}
