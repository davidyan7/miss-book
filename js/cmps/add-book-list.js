import addBookPreview from './add-book-preview.js';

export default {
    props: ['books'],
    template: `
    <ul class="search-book-list">
        <li v-for="book in books" :key="book.id" class="book-preview-container" >
            <add-book-preview :book="book"  />
            <button @click="addBook(book)">Add book</button>
        </li>
    </ul>
    `,
    methods: {
        addBook(book) {
            this.$emit('addBook', book)
        }
    },
    components: {
        addBookPreview
    }

};