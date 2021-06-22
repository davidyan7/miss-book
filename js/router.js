import homePage from './pages/home-page.js';
import bookApp from './pages/book-app.js';
import addBook from './cmps/add-book.js';
import bookDetails from './pages/book-details.js';
import aboutPage from './pages/about-page.js';





const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp,
    },
    {

        path: '/add-book',
        component: addBook
    },
    {
        path: '/about',
        component: aboutPage,

    },
    {
        path: '/book/details/:bookId',
        component: bookDetails
    },
]



export const router = new VueRouter({ routes });