import React, {useEffect, useState} from 'react'
import './scss/app.scss'
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

const App = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        fetch('https://63c8e85d320a0c4c953cd10d.mockapi.io/items').then((res) => {
            return res.json()
        }).then((josn) => {
            setItems(josn)
    })
    },[])

    return (
        <div>
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <div className="container">
                        <div className="content__top">
                            <Categories/>
                            <Sort/>
                        </div>
                        <h2 className="content__title">Все пиццы</h2>
                        <div className="content__items">
                            {items.map((pizza) =>
                                <PizzaBlock
                                    key={pizza.id}
                                    imageUrl={pizza.imageUrl}
                                    title={pizza.title}
                                    price={pizza.price}
                                    sizes={pizza.sizes}
                                    types={pizza.types}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;