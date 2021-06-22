export const axiosService = {
    ask
}

function ask(searchInput) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`;
    return axios.get(url)
        .then(res => res.data)
}