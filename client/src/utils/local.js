export const Local = {
    getFavorites: () => {
        return JSON.parse(localStorage.getItem('favorites'));
    },
    addFavorite: (input) => {
        const favsArr = JSON.parse(localStorage.getItem('favorites'));
        const newFavsArr = [...favsArr, input];
        localStorage.setItem('favorites', JSON.stringify(newFavsArr));
        return;
    },
    removeFavorite: (input) => {
        const favsArr = JSON.parse(localStorage.getItem('favorites'));
        const newFavsArr = favsArr.filter(item => item !== input);
        localStorage.setItem('favorites', JSON.stringify(newFavsArr));
        return;
    },
}