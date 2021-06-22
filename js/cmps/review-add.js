import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
    props: ['book'],
    template: `
    <section class="review-add">
        <h1>add review</h1>
        <form @submit.prevent="save">
            <ul>
                <li> Name:<input type="text" v-model="review.name"  value="Book reader"></li>
                <li>Rate:
                    <select v-model="review.starRate">
            <option>⭐</option>
            <option>⭐⭐</option>
            <option>⭐⭐⭐</option>
            <option>⭐⭐⭐⭐</option>
            <option>⭐⭐⭐⭐⭐</option>
        </select></li>
        <li>Date:
            <input type="date" v-model="review.date"></li>
            <li> Review:<input type="text" v-model="review.txt"  ></li>
        </ul>
        <button>Save</button>
        </form>
        
    </section>
    `,
    data() {
        return {
            review: {},
            id: 101
        };
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books);
        },
        save() {
            this.review.id = this.id
                // this.id = this.id + 1
            this.id++
                this.$emit('saveReview', this.review)
            const msg = {
                txt: 'Review Added',
                type: 'success'
            };
            eventBus.$emit('show-msg', msg, this.book);

        }
    }
};