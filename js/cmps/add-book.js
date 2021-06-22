import { bookService } from '../services/book-service.js'
import addBookList from './add-book-list.js';


export default {
    template: `
    <section class="add-book">
        Search:
        <input @input="searchBook" v-model="searchTxt"  type="text">
        <add-book-list @addBook="addBook" :books='books'></add-book-list>
        
    </section>
    `,
    data() {
        return {
            searchTxt: '',
            books: null,
        };
    },
    methods: {
        addBook(book) {
            bookService.addBook(book)
        },
        searchBook() {
            bookService.searchTxt(this.searchTxt)
                .then(books => this.books = books.items)
        }
    },
    components: {
        addBookList
    }
}