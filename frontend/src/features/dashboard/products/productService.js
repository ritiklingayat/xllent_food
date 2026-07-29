const PRODUCT_KEY = "xllent_products";


export function getProducts(){

    const data = localStorage.getItem(PRODUCT_KEY);

    return data 
        ? JSON.parse(data)
        : [];

}



export function saveProducts(products){

    localStorage.setItem(
        PRODUCT_KEY,
        JSON.stringify(products)
    );

}



export function addProduct(product){

    const products = getProducts();


    const newProduct = {

        id: Date.now(),

        ...product,

    };


    const updated = [

        ...products,

        newProduct

    ];


    saveProducts(updated);


    return newProduct;

}



export function updateProduct(id,data){

    const products = getProducts();


    const updated = products.map(product=>

        product.id === id

        ?

        {
            ...product,
            ...data
        }

        :

        product

    );


    saveProducts(updated);


}



export function deleteProduct(id){

    const products = getProducts();


    const updated = products.filter(

        product => product.id !== id

    );


    saveProducts(updated);

}