import SummaryApi from "../common/SummaryApi";


// Fetch all products
export const getProducts = async () => {
    const response = await fetch(SummaryApi.getProducts.url);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return await response.json();
};

// Add a product
export const addProduct = async (product) => {
    const response = await fetch(SummaryApi.addProducts.url, {
        method: SummaryApi.addProducts.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error("Failed to add product");
    }

    return await response.json();
};

// Delete a product
export const deleteProduct = async (id) => {
    const response = await fetch(`${SummaryApi.deleteProducts.url}/${id}`, {
        method: SummaryApi.deleteProducts.method,
    });

    if (!response.ok) {
        throw new Error("Failed to delete product");
    }

    return await response.json();
}

