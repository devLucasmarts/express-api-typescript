import connection from "../models/connection";
import BookModel from "../models/book.model";
import Book from "../interfaces/book.interface";
import { NotFoundError } from 'restify-errors';

class BookService {
    public model: BookModel;

    constructor() {
        this.model = new BookModel(connection);
    };

    public async getAll(): Promise<Book[]> {
        const books = await this.model.getAll();

        return books;
    };

    public async getById(id: number): Promise<Book> {
        const book = await this.model.getById(id);

        return book;
    };

    public create(book: Book): Promise<Book> {
        return this.model.create(book);
    };

    public async updateBook(id: number, book: Book): Promise<void> {
        const bookFound = await this.getById(id);

        if (!bookFound) {
            throw new NotFoundError('NotFoundError');
        };

        return this.model.updateBook(id, book);
    };

    public async removeBook(id: number): Promise<void> {
        const getBook = await this.getById(id);

        if (!getBook) {
            throw new NotFoundError('NotFoundError');
        };

        return this.model.removeBook(id);
    };
};

export default BookService;
