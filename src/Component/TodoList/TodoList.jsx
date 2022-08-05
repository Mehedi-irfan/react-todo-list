import React, { useEffect, useState } from 'react';
import './TodoList.css';

const localStorageData = () => {
    let list = localStorage.getItem('Lists')
    if (list) {
        return JSON.parse(localStorage.getItem('Lists'));
    }
    else {
        return [];
    }
}


const TodoList = () => {
    //Declear the state for the store input field data
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState(localStorageData());
    const [toggleBtn, setToggleBtn] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    //Set the data on local stroge
    useEffect(() => {
        localStorage.setItem('Lists', JSON.stringify(items))
    }, [items])

    //Add the item on the Display from input value
    const handleClick = () => {
        if (!inputValue) {
            alert('Please Input Your Valid Value')
        } else if (inputValue && !toggleBtn) {
            setItems(
                items.map((item) => {
                    if (item.id === isEditItem) {
                        return { ...item, name: inputValue }
                    }
                    return item;
                })
            );
            setToggleBtn(true);
            setInputValue('');
            setIsEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputValue }
            setItems([...items, allInputData]);
            setInputValue('')
        }
    }
    //delete the item on the Display
    const deleteItems = id => {
        const updatedItems = items.filter((el) => {
            return el.id !== id;
        })
        setItems(updatedItems)
    }
    //edit the item on Display
    const editedItems = id => {
        let editItemUpdate = items.find((item) => {
            return item.id === id;
        })
        setToggleBtn(false);
        setInputValue(editItemUpdate.name);
        setIsEditItem(id);
    }
    //Remove all item of the Display
    const RemoveAll = () => {
        setItems([])
    }
    return (
        <div>
            <div className="main-div">
                <div className="center-div">
                    <h1>ToDo List Add Your Item</h1>
                    {/* input field  */}
                    <div className="input-div">
                        <input type="text" placeholder='Add Items'
                            value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                        />
                        {
                            toggleBtn ? <i className="fa-solid fa-plus icon" title='Add Item'
                                onClick={handleClick}
                            ></i> : <i className="fa-solid fa-pen-to-square icon" title='Update Item'
                                onClick={handleClick}
                            ></i>
                        }

                    </div>
                    {/* Display field  */}
                    <div className="show-item">
                        {
                            items.map((el) => {
                                return (
                                    <div className="each-item" key={el.id}>
                                        <p>{el.name} </p>
                                        <div className='icon-div'>
                                            <i className="fa-solid fa-pen-to-square icon" title='Edit Item' onClick={() => editedItems(el.id)}></i>
                                            <i className="fa-solid fa-trash-can icon" title='Delete Item' onClick={() => deleteItems(el.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="remove-btn">
                        <button className='btn' onClick={RemoveAll}>Remove All</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TodoList;