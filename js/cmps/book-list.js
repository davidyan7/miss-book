import bookPreview from './book-preview.js';

export default {
    props: ['books'],
    template: `
    <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-preview-container" >
            <book-preview :book="book" @click.native="log(book.id)" />
            <img class="sale" v-if="book.listPrice.isOnSale" src="/img/sale.png" >
            <div class="actions">
                <button @click="remove(book.id)">X</button>
                <!-- <button @click="select(book)">Details</button> -->
                <router-link :to="'/book/details/'+book.id">Details</router-link>
            </div>
        </li>
    </ul>
    `,
    methods: {
        remove(bookId) {
            console.log('removing...');
            this.$emit('remove', bookId);
        },
        select(book) {
            this.$emit('selected', book);
        },
        log(bookId) {
            console.log('logging th id', bookId);
        }
    },
    components: {
        bookPreview
    }

};