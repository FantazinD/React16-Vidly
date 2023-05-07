import React, { Component } from "react";

const ListGroup = ({ items, selectedItem, textProperty, valueProperty, onItemSelect }) => {
    return (
        <ul className="list-group">
            {items.map((item) => (
                <li
                    onClick={() => {
                        onItemSelect(item);
                    }}
                    key={item[valueProperty]}
                    className={`list-group-item${selectedItem === item ? ` active` : ``}`}
                >
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id",
};

export default ListGroup;
