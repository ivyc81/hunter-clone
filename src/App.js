import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import './App.css';
import apiHelper from './api';
import Column from './Column';
import NewJobForm from './NewJobForm';

const StyledApp = styled.div`
  padding: 32px;
  text-align: center;
  display: flex;

  * {
    box-sizing: border-box;
  }
`;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const updateDb = async(source, destination, data) => {
  const now = new Date();
  await apiHelper.deleteResource(source.droppableId, data.id);
  data[`${destination.droppableId}At`] = now.toDateString();
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

const chooseColor = (companyName) =>{
  let R = 0;
  let G = 0;
  let B = 0;

  for(let i = 0; i < companyName.length; i++){
    if(i % 3 === 0){
      R += companyName.charCodeAt(i);
    } else if (i % 3 === 1){
      G += companyName.charCodeAt(i);
    } else {
      B += companyName.charCodeAt(i);
    }
  }

  return `rgb(${R % 255}, ${G % 255}, ${B % 255})`;
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      wishList: [],
      applied: [],
      codeChallenge: [],
      phoneScreen: [],
      onSite: [],
      offer: [],
      rejected: [],
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async componentDidMount(){
    const state = {};

    for(let key in this.state){
      state[key] = await apiHelper.getResource(`${key}`);
      let date = `${key}At`;
      state[key].sort((a, b) => new Date(b[date]) - new Date(a[date]));
    }

    this.setState(state)
  }

  async addItem(resource, data){
    const companyName = data.company;
    const color = chooseColor(companyName);
    data.id = uuid();
    data.color = color;
    const result = await apiHelper.addResource('wishList', data);
    this.setState({wishList: [...this.state.wishList, result] });
  }

  async deleteItem(resource, index){
    await apiHelper.deleteResource(resource, index);
    const {[resource]: update} = this.state;
    const newResource = update.filter(ele => ele.id !== index);

    this.setState({[resource]: newResource});
  }

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
      arr.push(<Column
                  triggerDelete={this.deleteItem}
                  key={key}
                  title={key}
                  droppableId={key}
                  items={this.state[key]}
                />);
    }

    return arr;
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const columns = this.createColumns();
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <StyledApp>
          <NewJobForm triggerAddJob={this.addItem}/>
          {columns}
      </StyledApp>
    </DragDropContext>
    );
  }
}

export default App;

