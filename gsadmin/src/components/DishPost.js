import React, { useState } from 'react';

function DishPost(props) {
    const [dish_name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [featured, setFeatured] = useState(false);
    const [category, setCategory] = useState('');
    const [dishImage, setImage] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(dish_name, category, price, description, featured);
        const formData = new FormData();
        formData.append('dish_name', dish_name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('featured', featured);
        if (dishImage != null)
            formData.append('dishImage', dishImage, dishImage.name);
        props.addDishWI(formData);
    }
    return (
        <div className="gs-color-dark">
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Dish Title</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="dishname" value={dish_name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Dish Category</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Price</label>
                    <div className="col-sm-9">
                        <input type="number" className="form-control" name="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-9">
                        <input type="textarea" className="form-control" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                    </div>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" name="featured" checked={featured} onChange={() => setFeatured(!featured)}></input>
                    <label htmlFor="featured" className="form-check-label">Want it to be featured</label>
                </div>
                <div className="form-group row">
                    <label htmlFor="image" className="col-sm-3 col-form-label">Dish Image</label>
                    <div className="col-sm-9">
                        <input type="file" name="dishImage" onChange={(e) => setImage(e.target.files[0])} ></input>
                    </div>

                </div>
                <button type="submit" className="btn btn-primary" >Add Dish</button>
            </form>
        </div>
    );
}

export default DishPost;