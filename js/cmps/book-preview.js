export default {
    props: ['book'],
    template: `
    <div class="book-preview">
    <h4>Name: {{book.title}}</h4>
    <img class="book-img":src="book.thumbnail" alt="">
    <p>Price: {{book.listPrice.amount}}{{currencyShow}}</p>
    </div>
    `,

    computed: {
        currencyShow() {

            if (this.book.listPrice.currencyCode === 'ILS') return '₪'
            if (this.book.listPrice.currencyCode === 'EUR') return '€'
            return '$'
        },


    },
};