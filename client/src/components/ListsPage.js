import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import './ListsPage.css';

const ListsPage = () => {
  const [lists, setLists] = useState([
    {
      _id: '1',
      name: 'Saved List 1',
      responseCodes: ['200', '201', '202', '204', '206', '301', '302', '304', '307', '400', '401', '403', '404', '405', '408', '500', '501', '502', '503', '504', '505']
    },
    {
      _id: '2',
      name: 'Saved List 2',
      responseCodes: ['200', '201', '202', '204', '206']
    },
    {
      _id: '3',
      name: 'Saved List 3',
      responseCodes: ['301', '302', '304', '307']
    },
    {
      _id: '4',
      name: 'Saved List 4',
      responseCodes: ['400', '401', '403', '404', '405', '408']
    },
    {
      _id: '5',
      name: 'Saved List 5',
      responseCodes: [ '500', '501', '502', '503', '504', '505']
    }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get('/api/lists');
      setLists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (list) => {
    setIsEditing(true);
    setSelectedList(list);
    setNewListName(list.name);
  };

  const handleSave = async () => {
    try {
      if (selectedList) {
        // Update an existing list
        await axios.put(`/api/lists/${selectedList._id}`, {
          name: newListName
        });
      } else {
        // Create a new list
        await axios.post('/api/lists', {
          name: newListName,
          responseCodes: []
        });
      }
      setIsEditing(false);
      setSelectedList(null);
      setNewListName('');
      fetchLists();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (list) => {
    try {
      await axios.delete(`/api/lists/${list._id}`);
      fetchLists();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="list-page">
      <h2>Lists</h2>
      <div className="list-page__list">
        {lists.map((list) => (
          <ListItem
            key={list._id}
            list={list}
            isEditing={isEditing && selectedList?._id === list._id}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            newListName={newListName}
            setNewListName={setNewListName}
          />
        ))}
      </div>
    </div>
  );
};

export default ListsPage;
