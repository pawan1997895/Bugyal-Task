export const GetAllProducts = async(search = '', page = 1, limit = 5) => {
    const url =
        `${BASE_URL}/api/product?search=${search}&page=${page}&limit=${limit}`;
    try {
        const options = {
            method: 'GET',
            'Content-Type': 'application/json'
        }
        const result = await fetch(url,options)
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const CreateProduct = async(prdObj) => {
    const url =
        `${BASE_URL}/api/product`;
    try {
        const formData = new FormData()

        for(const key in prdObj) {
            formData.append(key, prdObj[key])
        }
        const options = {
            method: 'POST',
            'Content-Type': 'application/json',
            body: formData
        }
        const result = await fetch(url,options)
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const UpdateProductById = async (prdObj, id) => {
    const url = `${BASE_URL}/api/product/${id}`;
    console.log('url ', url);
  
    const formData = new FormData();


    for (const key in prdObj) {
        formData.append(key, prdObj[key]);
    }

    const options = {
        method: 'PUT',
        body: formData
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log('<---update--> ', data);
        return data;
    } catch (err) {
        return err;
    }
};

export const DeleteProductById = async (id) => {
    const url =
        `${BASE_URL}/api/product/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}

export const GetProductById = async (id) => {
    const url =
        `${BASE_URL}/api/product/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}
