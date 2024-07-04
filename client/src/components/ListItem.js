import React from 'react';
import './ListItem.css';

const ListItem = ({ list, isEditing, onEdit, onSave, onDelete, newListName, setNewListName }) => {
  const handleEdit = () => {
    onEdit(list);
  };

  const handleSave = () => {
    onSave();
  };

  const handleDelete = () => {
    onDelete(list);
  };

  return (
    <div className="list-item">
      {isEditing ? (
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="list-item__input"
        />
      ) : (
        <h3>{list.name}</h3>
      )}
      <div className="list-item__codes">
        {list.responseCodes.map((code, index) => (
          <span key={index} className="list-item__code">
            <img src={`https://http.dog/${code}.jpg`} alt={`HTTP ${code}`} className="list-item__code-image" />
            {code}
          </span>
        ))}
      </div>
      <div className="list-item__actions">
        {isEditing ? (
          <button onClick={handleSave} className="list-item__button">
            Save
          </button>
        ) : (
          <button onClick={handleEdit} className="list-item__button">
            Edit
          </button>
        )}
        <button onClick={handleDelete} className="list-item__button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
