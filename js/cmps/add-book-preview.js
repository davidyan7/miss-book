export default {
    props: ['book'],
    template: `
    <div class="add-book-preview">
    <h4>{{book.volumeInfo.title}}</h4>
    <img class="add-list-img" v-if="book.volumeInfo.imageLinks.smallThumbnail" :src="book.volumeInfo.imageLinks.smallThumbnail" alt="">
    <!-- <img class="book-img":src="book.thumbnail" alt=""> -->
    <!-- <p>Price: {{book.listPrice.amount}}{{currencyShow}}</p> -->
    </div>
    `,
    data() {
        return {

        }
    },

    computed: {

    },
    created() {

    }


}