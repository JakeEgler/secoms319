import { useState, useEffect } from "react";

function App() {
    const [product, setProduct1] = useState([]);
    const [viewer1, setViewer1] = useState(false);
    const showAllItems = product.map((el) => (
        <div key={el._id}>
            <img src={el.image} width={30} /> <br />
            Id: {el.id} <br />
            Title: {el.title} <br />
            Price: {el.price} <br />
            Description: {el.description} <br />
            Category: {el.category} <br />
            Image: {el.image} <br />
            Rate: {el.rating.rate} and Count: {el.rating.count} <br />
        </div>
    ));


    return (
        <div>
            <button onClick={() => addProduct()}>Add Product</button>
            <button onClick={() => getAllProducts()}>All Products</button>
            <button onClick={() => updateProduct()}>Update Product</button>
            <button onClick={() => deleteProduct()}>Delete Product</button>
            
            <hr></hr>
            {viewer1 && <div>Products {showAllItems}</div>}
        </div>
    )
}

export default App;

function getAllProducts() {
    fetch("http://localhost:3000/")
        .then((response) => response.json())
        .then((data) => {
            console.log("Displaying all products...");
            console.log(data);
            setProduct(data);
        });
    setViewer1(!viewer1);
}