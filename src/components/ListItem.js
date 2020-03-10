import React from 'react';

const ListItem = ({item, active, setSelected, setHovered, searchedText}) => {
    function getHighlightedText(text) {
        return text.replace(new RegExp(searchedText, "i"), (match) => `<b>${match}</b>`);
    }

    return (
        <div
            className={`item ${active ? 'active' : ''}`}
            onClick={() => setSelected(item)}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(undefined)}
            dangerouslySetInnerHTML={{
                __html: getHighlightedText(item.name)
            }}
        >
        </div>
    )
};

export default ListItem;