const PRODUCT_KEY = "xllent_products";



export const getProducts = () => {


    return (

        JSON.parse(

            localStorage.getItem(PRODUCT_KEY)

        )

        || []

    );


};





export const saveProducts = (products) => {


    localStorage.setItem(

        PRODUCT_KEY,

        JSON.stringify(products)

    );



    window.dispatchEvent(

        new Event("productsUpdated")

    );


};





export const getProductById = (id) => {


    const products = getProducts();



    return products.find(

        product =>

        String(product.id) === String(id)

    );


};