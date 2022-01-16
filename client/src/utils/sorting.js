const sorting = {
    // Define a function that will be use to sort listings alphabetically
    titleSort: (x, y) => {
        // Set the titles to uppercase for better comparisons
        let xTitle = x.title.toUpperCase();
        let yTitle = y.title.toUpperCase();
        if(xTitle < yTitle) {return -1;}
        if(xTitle > yTitle) {return 1;}
        return 0;
    },
    // Define a compare function that will sort listings by number
    priceSort: (x, y) => {
        // Set the prices to float
        let xPrice = parseFloat(x.price);
        let yPrice = parseFloat(y.price);
        // Compare
        if(xPrice < yPrice) {return -1;}
        if(xPrice > yPrice) {return 1;}
        return 0;
    }
}

export default sorting;