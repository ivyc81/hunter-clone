import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import apiHelper from './api';
import Column from './Column';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const updateDb = async(source, destination, data) => {
  await apiHelper.deleteResource(source.droppableId, data.id);
  await apiHelper.addResource(destination.droppableId, data);
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);
  updateDb(droppableSource, droppableDestination, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class App extends Component {
  state = {
    items: [],
    selected: [],
    newList: [],
  };

  async componentDidMount(){
    let items = await apiHelper.getResource('items');
    let selected = await apiHelper.getResource('selected');
    let newList = await apiHelper.getResource('newList');

    this.setState({items, selected, newList})
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  // id2List = {
  //   droppable: 'items',
  //   droppable2: 'selected'
  // };

  getList = id => this.state[id];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      const columnId = source.droppableId;
      const state = { [columnId]: items };

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      const state ={};
      for(let key in result){
        state[key] = result[key];
      }

      this.setState(state);
    }
  };

  createColumns() {
    const arr = [];
    for (let key in this.state) {
      arr.push(<Column key={key} title={key} droppableId={key} items={this.state[key]} />);
    }

    return arr;
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const columns = this.createColumns();
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className='App'>
          {columns}
        </div>
      </DragDropContext>
    );
  }
}

export default App;

