import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://63c8e85d320a0c4c953cd10d.mockapi.io/items').then((res) => {
            return res.json()
        }).then((josn) => {
            setItems(josn)
            setIsLoading(false)
        });
        window.scrollTo(0,0)
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : items.map((pizza) =>
                        <PizzaBlock
                            key={pizza.id}
                            imageUrl={pizza.imageUrl}
                            title={pizza.title}
                            price={pizza.price}
                            sizes={pizza.sizes}
                            types={pizza.types}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Home;