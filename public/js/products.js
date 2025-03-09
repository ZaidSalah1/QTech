


var all_products_json = null;

if (!all_products_json) {
    // Fetch products once when the page loads
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            all_products_json = data;
            // console.log("-------> Fetched Products:", all_products_json);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

}

