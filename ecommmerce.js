let products = [];
const getProductsData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    products = data.products;
    console.log(products);

    products.map((products) => {
        const productContainer = document.getElementById("products-container");
        const div 
    })
}
getProductsData();
for (let i = 0; i<20;i++)
{
    const productContainer = document.getElementById("products-container");
}