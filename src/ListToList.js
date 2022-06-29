import React, { useEffect, useState } from 'react'
import { useListToList } from './ListToListContext';

function ListGroupItem({ item, handleClick, icon }) {
    return (
        <div className={`
            min-w-[270px] flex justify-between items-center border-b-2 
            border-stone-100 border-solid border-spacing-x-12
        `}>
            <div>
                <h3>{item.title}</h3>
                {item.subtitle && <small>{item.subtitle}</small>}
            </div>
            <button
                onClick={handleClick}
                className={`
                bg-red-500 hover:bg-red-300 grid place-content-center 
                rounded text-white p-2 w-10 h-10
            `}>
                {icon}
            </button>
        </div>
    );
}

function ListGroup({ children }) {

    return (
        <div className={`
            grid place-items-center min-w-[270px] min-h-[100px] 
            p-2 bg-white rounded-md border-2 
            border-stone-100 
            border-solid shadow-lg
        `}>
            {children}
        </div>
    )
}

export default function ListToList() {
    const {
        available,
        selected,
        filteredAvailable,
        filteredSelected,
        add,
        remove,
        filterAvailable,
        filterSelected
    } = useListToList();
    const [availableSearch, setAvailableSearch] = useState('');
    const [selectedSearch, setSelectedSearchh] = useState('');

    useEffect(() => {
        filterAvailable(availableSearch);
    }, [availableSearch]);

    useEffect(() => {
        filterSelected(selectedSearch);
    }, [selectedSearch]);

    return (
        <>
            {available &&
                <div className='flex flex-wrap justify-center'>
                    <div className="available mr-2">
                        <h1 className='text-lg text-center'>Available</h1>
                        <input
                            value={availableSearch}
                            onChange={e => setAvailableSearch(e.target.value)}
                            type='text' placeholder='Filter available...'
                            className='p-2 w-full outline-none shadow-md border-b-2 border-gray-400 focus:border-blue-700 mb-2' />
                        {!(filteredAvailable && availableSearch !== '') ?
                            <ListGroup>
                                {available.length > 0 ? available.map((x, i) => (
                                    <ListGroupItem key={i} item={x} handleClick={() => add({ ...x, selectedSearch })} icon='+' />
                                )) : <h4 className='text-center text-2xl text-gray-400'>Empty list</h4>}
                            </ListGroup>
                            :
                            <ListGroup>
                                {filteredAvailable.length > 0 ? filteredAvailable.map((x, i) => (
                                    <ListGroupItem key={i} item={x} handleClick={() => add({ ...x, selectedSearch })} icon='+' />
                                )) : <h4 className='text-center text-2xl text-gray-400'>Empty list</h4>}
                            </ListGroup>
                        }

                    </div>
                    <div className="available">
                        <h1 className='text-lg text-center'>Selected</h1>
                        <input
                            value={selectedSearch}
                            onChange={e => setSelectedSearchh(e.target.value)}
                            type='text' placeholder='Filter selected...'
                            className='p-2 w-full outline-none shadow-md border-b-2 border-gray-400 focus:border-blue-700 mb-2' />
                        {!(filteredSelected && selectedSearch !== '') ?
                            <ListGroup>
                                {selected.length > 0 ? selected.map((x, i) => (
                                    <ListGroupItem key={i} item={x} handleClick={() => remove({ ...x, availableSearch })} icon='-' />
                                )) : <h4 className='text-center text-2xl text-gray-400'>Empty list</h4>}
                            </ListGroup>
                            :
                            <ListGroup>
                                {filteredSelected.length > 0 ? filteredSelected.map((x, i) => (
                                    <ListGroupItem key={i} item={x} handleClick={() => remove({ ...x, availableSearch })} icon='-' />
                                )) : <h4 className='text-center text-2xl text-gray-400'>Empty list</h4>}
                            </ListGroup>
                        }
                    </div>
                </div>
            }
        </>
    )
}
