import React, { useEffect } from 'react'
import ListToList from './ListToList';
import { useListToList } from './ListToListContext';

const people = [
    { id: 1, name: 'Johan', hobby: 'Music' },
    { id: 2, name: 'Alberto', hobby: 'PlayStation' },
    { id: 3, name: 'Laura', hobby: 'Programming' },
];

const People = () => {
    const data = people.map(person => ({ 
        id: person.id, 
        title: person.name, 
        subtitle: person.hobby 
    }));
    const { setInitialValues, selected } = useListToList();

    useEffect(() => {
        setInitialValues(data);
    }, []);
    return <ListToList />;
}

export default People;