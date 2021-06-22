import bookApp from '../js/pages/book-app.js'
import homePage from '../js/pages/home-page.js'
import bookDetails from '../js/pages/book-details.js'
import appHeader from './cmps/app-header.js';
import appFooter from './cmps/app-footer.js';
import userMsg from './cmps/user-msg.js';
import addBook from './cmps/add-book.js';
import { router } from './router.js';


const options = {
    el: '#app',
    router,
    template: `
        <section>
        <user-msg />
        <app-header/>
        <router-view/>
        <app-footer />
        </section>
    `,
    components: {
        bookApp,
        appHeader,
        appFooter,
        userMsg
    }
};

const app = new Vue(options);