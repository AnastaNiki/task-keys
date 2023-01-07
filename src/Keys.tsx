import { IItem } from './index';
import { useState } from 'react';

function Item(props: { id: number; name: string }) {
    const [name, setName] = useState(props.name);
    const [newName, setNewName] = useState(props.name);
    const [edit, setEdit] = useState(false);

    if (edit) {
        return (
            <input
                type="text"
                defaultValue={name}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                        setEdit(false);
                    } else if (event.key === 'Enter') {
                        setName(newName);
                        setEdit(false);
                    }
                }}
                onChange={(event) => setNewName(event.target.value)}
            />
        );
    } else return <div onClick={() => setEdit(true)}>{name}</div>;
}

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    if (props.sorting === 'DESC') {
        props.initialData.sort((a, b) => b.id - a.id);
    } else props.initialData.sort((a, b) => a.id - b.id);

    return (
        <div>
            {props.initialData.map((item) => (
                <Item key={item.id} id={item.id} name={item.name} />
            ))}
        </div>
    );
}
