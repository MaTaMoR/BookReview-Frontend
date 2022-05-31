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

export enum BookType {

  INDEPENDIENTE= "INDEPENDIENTE",
  BILOGIA = "BILOGIA",
  TRILOGIA = "TRILOGIA",
  SAGA = "SAGA",
  SERIE = "SERIE"

}

// --------------- REQUESTS ---------------

export interface BookRequest {

  id?: string;
  title?: string;
  bookType?: BookType;
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
  fullName?: string;

  nameCriteria?: FilterCriteria;
  surnamesCriteria?: FilterCriteria;
  fullNameCriteria?: FilterCriteria;

}

export interface EditorialRequest {

  id?: string;
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
  autor?: UserRequest;
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


export interface Book {

  id: string;
  title: string;
  description: string;
  bookType: BookType;
  publishedDate: Date;
  totalPages: number;
  image: Image;

  autor: Autor;
  editorial: Editorial;
  categories: Category[];

  likes: Like[];

}

export interface Image {

  id: string;
  name: string;
  type: string;

}

export interface Autor {

  id: string;
  name: string;
  surnames: string;

}

export interface Editorial {

  id: string;
  name: string;
  image: Image;

}

export interface Category {

  id: string;
  name: string;

}

export interface User {

  id: string;
  username: string;
  name: string;
  surnames: string;
  image: Image;

}

export interface Review {

  id: string;
  autor: User;
  book: Book;
  review: string;
  image: Image;
  score: number;
  reviewDate: Date;
  likes: Like[];

}

export interface Like {

  id: string;
  contentId: string;
  userId: string;
  date: Date;

}

export interface Order {

  direction: OrderDirection;
  property: string;

}

export interface Sort {

  orders: Order[];

}

export interface Pageable {

  page: number;
  size: number;
  totalElements: number;
  sort: Sort;

}

export interface Page<T> {

  content: T[];
  page: Pageable;

}
