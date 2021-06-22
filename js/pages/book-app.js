import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.js'
import bookFilter from '../cmps/book-filter.js'
import addBook from '../cmps/add-book.js'
import bookDetails from '../pages/book-details.js'
import { eventBus } from '../services/event-bus-service.js';



export default {
    template: `
        <section class="book-app">
             <nav>
                <router-link to="/add-book">Add Book</router-link> 
            </nav>
            <book-filter v-if="!selectedBook" @filtered="setFilter" />
            <book-list v-if="!selectedBook" :books="booksToShow" @remove="removeBook" @selected="selectBook" />
            <book-details v-if="selectedBook"  :book="selectedBook" @close="closeDetails" />
            <!-- <book-edit /> -->
        </section>
    `,
    data() {
        return {
            books: [],
            selectedBook: null,
            filterBy: null
        };
    },
    created() {
        this.loadBooks();
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books);
        },
        removeBook(id) {
            bookService.remove(id)
                .then(() => {
                    const msg = {
                        txt: 'Deleted successfuly',
                        type: 'success'
                    };
                    eventBus.$emit('show-msg', msg);
                    this.loadBooks();
                })
        },
        selectBook(book) {
            this.selectedBook = book;
        },
        closeDetails() {
            this.selectedBook = null;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }

    },
    computed: {
        booksToShow() {
            if (!this.filterBy ||
                (this.filterBy.title === '' &&
                    this.filterBy.minPrice === '' &&
                    this.filterBy.maxPrice === '')
            )
                return this.books;

            if (this.filterBy.minPrice === '') this.filterBy.minPrice = 0;
            if (this.filterBy.maxPrice === '') this.filterBy.maxPrice = Infinity;
            console.log(this.filterBy);
            const searchStr = this.filterBy.title.toLowerCase();
            const booksToShow = this.books.filter(book => {
                const isMaxPrice = book.listPrice.amount < this.filterBy.maxPrice
                console.log(isMaxPrice);
                console.log(book);
                return (
                    book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount <= +this.filterBy.maxPrice &&
                    book.listPrice.amount >= +this.filterBy.minPrice
                )
            });
            return booksToShow
        },


    },
    components: {
        bookList,
        bookDetails,
        bookFilter,
        addBook
    }
};