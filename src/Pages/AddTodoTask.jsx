import { Input } from '../Components/Inputs';
import { useState } from 'react';
import { Buttons } from '../Components/Buttons';

export default function AddTodoTask({handleAddItems}){
    const [listItem, setListItem] = useState('');

    return(
      <div className="list-add-container">
        <Input type="text" 
          id="add-list-input" 
          className="list-input" 
          placeholder="Add List Items here..."
          value={listItem}
          onChange={(e) => setListItem(e.target.value)} 
        />
        <Buttons 
          type="submit" 
          className="button add-list-button" 
          disabled={false} 
          value="Add Items"
          onClick={() => {
            setListItem('');
            handleAddItems(listItem);
          }}  
        />
      </div>
    )
}