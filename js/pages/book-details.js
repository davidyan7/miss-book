import { bookService } from '../services/book-service.js';
import reviewAdd from '../cmps/review-add.js';

export default {
    template: `
    <section v-if="book" class="book-details">
        <div class="details-book">
        <h2>Title : {{book.title}}</h2>
        <p>Authors : {{book.authors.join()}}</p>
        <p>Published date:{{ book.publishedDate}}</p>
        <p>Page count: {{book.pageCount}}</p>
        <p>Language: {{book.language}}</p>
        <p>Description: {{book.description.slice(0, 100)}} 
            <button v-if="!isShow" @click=toggelShow >Show More...</button> 
                    <span v-if="isShow">{{book.description.slice(100,book.description.length)}} </span> 
             <button v-if="isShow" @click=toggelShow >Show less</button>
            </p>
        
            <p :class="priceClass" >Price: {{book.listPrice.amount}}{{currencyShow}}</p>
            <p>{{pageCountShow}}</p>
            <p>{{publishedDateToShow}}</p>
            <img :src="book.thumbnail" >
        </div>
        <review-add @saveReview="saveReview" :book="book"></review-add>
        <span class="user-reviews" v-for="review in book.reviews">
            <ul>
                <li>Name: {{review.name}}</li>
                <li>Date: {{review.date}}</li>
                <li>Rate: {{review.starRate}}</li>
                <li>review{{review.text}}</li>
            </ul>
            <button @click="removeReview(review.id)">Delete</button>
        </span>
        <div>
            <router-link to="/book">Back</router-link>
            <router-link :to="'/book/details/' + nextBookId">Next Car</router-link>
        </div>
    </section>
    `,
    data() {
        return {
            book: null,
            nextBookId: null,
            review: null,
            isOnSale: false,
            isShow: false

        }
    },
    created() {
        console.log(this.$route.params);
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
            .then(book => {
                this.book = book
            })
    },
    methods: {
        saveReview(review) {
            this.review = review
            bookService.saveReview(review, this.book.id)
                .then(book => this.book = book)

        },
        removeReview(reviewId) {
            bookService.removeReview(reviewId, this.book.id)
                .then(book => this.book = book)

        },
        cheakSale() {
            console.log(this.isOnSale);
            this.isOnSale = this.book.listPrice.isOnSale
        },
        toggelShow() {
            this.isShow = !this.isShow
        }
    },

    computed: {
        priceClass() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        },

        currencyShow() {
            if (this.book.listPrice.currencyCode === 'ILS') return '₪'
            if (this.book.listPrice.currencyCode === 'EUR') return '€'
            return '$'
        },
        pageCountShow() {
            if (this.pageCount > 500) return 'Long reading'
            if (this.pageCount > 200) return 'Decent reading'
            if (this.pageCount < 100) return 'Light reading'

        },
        publishedDateToShow() {
            if (2021 - this.publishedDate > 10) return 'Veteran Book'
            return 'New!'
        }
    },
    components: {
        reviewAdd
    },
    watch: {
        '$route.params.bookId': {
            immediate: true,
            handler() {
                const { bookId } = this.$route.params;
                bookService.getById(bookId)
                    .then(book => this.book = book);
                bookService.getNextBookId(bookId)
                    .then(book => this.nextBookId = book);
            }
        }
    }
}