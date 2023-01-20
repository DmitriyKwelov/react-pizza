import React, {createContext, useContext, useState} from 'react'
import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from './redux/slices/filterSlice'

export const SearchContext = createContext('');

const App = () => {

    const [searchValue, setSearchValue] = useState('')

    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()

    return (
        <>
            <div>
                <div>
                    <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </button>
                    <span>{count}</span>
                    <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </button>
                </div>
            </div>
            <div className="wrapper">
                <SearchContext.Provider value={{searchValue, setSearchValue}}>
                    <Header/>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>
                </SearchContext.Provider>
            </div>
        </>
    );
};

export default App;