export default {
    template: `
    <header class="app-header">
        <img class="logo-header" src="../img/header-logo.jpeg" alt="">
        <nav class="nav-bar">
            <router-link to="/" active-class="active-link" exact>Home</router-link> |
            <router-link to="/Book" >Books</router-link> |
            <router-link to="/about" >About</router-link> 
        </nav>
    </header>
    `,
};