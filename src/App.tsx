import './App.css';
import './Checkbox.css';
import { useState } from 'react';
import { useFetcher, useResource } from 'rest-hooks';
import ItemResource from './utils/mocks';

import FormApp from './components/FormApp';
import { Categories, isCategory, isIterable, Payload } from './utils/types';


const sortCategoryItems = (data: Categories[]): Categories => {
  // TODO case new_data to MinCategories
  const new_data: Categories = {};
  data.forEach((item, index: number) => {
    if (isCategory(item.category)) {
      const name = item.category.name;
      const  category = new_data[name];
      if (isIterable(category)) {
        new_data[name] = [...category, { id: item.id, name: item.name, category: item.category }]
      } else {
        new_data[name] = [{ id: item.id, name: item.name, category: item.category }]
      }
    } else {
      const  category = new_data['empty'];
      if (isIterable(category)) {
        new_data['empty'] = [...category, { id: item.id, name: item.name, category: item.category }]
      } else {
        new_data['empty'] = [{ id: item.id, name: item.name, category: item.category }]
      }
    }
  })

  return new_data;
}

const App: React.FC = () => {
  
  const items: any = useResource(ItemResource.list(), {});
  const create = useFetcher(ItemResource.create());
  const categories: Categories = sortCategoryItems(items);

  const [isOpen, setOpen] = useState(true);

  const toggleForm = () => {
    setOpen(!isOpen)
  }

  const handleSubmit = async (data: Payload) => {
    alert(JSON.stringify(await create(data)))
  }


  return (
    <>
      {!isOpen ?
        <div className="content main">
          <button className="button-secondary" onClick={toggleForm}>
            {'Open Form'}
          </button>
        </div>
        :
        <div className="content">
          <FormApp handleSubmit={handleSubmit} categories={categories} toggleForm={toggleForm} />
        </div>
      }
    </>
  );
};

export default App;
