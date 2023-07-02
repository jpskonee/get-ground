import { APIStateProps } from "../../generalType";

export enum ListNamesEnum {
    BOOKS = 'books'
}

export interface GetListPayload {
    endpoint: string;
    payload?: {
        itemsPerPage: number,
        page: number;
        filter?: { type: string, value: string }[]
    };
    listName: ListNamesEnum;
}

export interface ListStateProps {
    books: BookListStateProps;
}

//Books types
interface BookListStateProps extends APIStateProps {
    data: BookProp[],
    count: number
}

interface BookProp {
    id: number,
    book_author: string[],
    book_title: string,
    book_publication_year: number,
    book_publication_country: string,
    book_publication_city: string,
    book_pages: number
}

export const BookPropsDefault = {
    id: 0,
    book_author: [''],
    book_title: '',
    book_publication_year: 0,
    book_publication_country: '',
    book_publication_city: '',
    book_pages: 0
}
