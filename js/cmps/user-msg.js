import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
            <p v-if="!book">{{msg.txt}}</p>
            <p v-if="book">Book {{book.title}} was successfully added</p>
        </div>
    `,
    data() {
        return {
            msg: null,
            book: null
        };
    },
    created() {
        eventBus.$on('show-msg', this.showMsg);
    },
    destroyed() {
        eventBus.$off('show-msg', this.showMsg);
    },
    methods: {
        showMsg(msg, book) {
            if (book) this.book = book
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        }
    }
};