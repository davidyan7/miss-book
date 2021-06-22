export default {
    template: `
    <section class="book-filter">
        <label>Search:</label>
        <input v-model="filterBy.title" type="text" @input="filter" placeholder="Search...">
        <input v-model="filterBy.minPrice" type="number" @input="filter" placeholder="Price...">
        <input v-model="filterBy.maxPrice" type="number" @input="filter" placeholder="Price...">
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: '',
                maxPrice: '',
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
        }
    }
};