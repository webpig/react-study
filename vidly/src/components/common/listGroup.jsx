import React from 'react';

const ListGroup = ({ items, valueProperty, textProperty, onItemSelect, selectedItem }) => {
    return ( 
        <ul className="list-group">
            {
                items.map(item => 
                    <li
                        key={item[valueProperty]}
                        className={ item === selectedItem ? 'list-group-item active' : 'list-group-item'}
                        onClick={() => onItemSelect(item)}>
                        {item[textProperty]}
                    </li>
                )
            }
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
};
 
export default ListGroup;