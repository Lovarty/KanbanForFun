import React, { Component } from 'react';
import './App.css';
import uuidv1 from 'uuid/v1';

import BoardColumns from './components/board-columns';
import Popup from './components/popup';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectName: "Test",
      columnsData: [
        {
          id: uuidv1(),
          title: "TO DO",
          tasks: [
            {
              id: uuidv1(),
              title: "task 1",
              description: "Green green grass"
            },
            {
              id: uuidv1(),
              title: "task 2",
              description: "Tralivali"
            },
            {
              id: uuidv1(),
              title: "task 3",
              description: "Pilgrims"
            }
          ]
        },
        {
          id: uuidv1(),
          title: "IN PROGRESS",
          tasks: [
            {
              id: uuidv1(),
              title: "task 4",
              description: "Maharacheeowa"
            },
            {
              id: uuidv1(),
              title: "task 5",
              description: "Roses are red"
            }
          ]
        },
        {
          id: uuidv1(),
          title: "CODE REWIEW",
          tasks: [
            {
              id: uuidv1(),
              title: "task 6",
              description: "Antoshka"
            }
          ]
        },
        {
          id: uuidv1(),
          title: "DONE",
          tasks: [
            {
              id: uuidv1(),
              title: "task 7",
              description: "About making right decisions"
            },
            {
              id: uuidv1(),
              title: "task 8",
              description: "Nothing interesting"
            }
          ]
        },
      ],
      showPopup: false
    }
  }

  addNewTask = (task) => {
    const newTask = {
      title: task && task.title,
      description: task && task.description,
      id: uuidv1()
    };

    const tasks = this.state.columnsData.slice();
    tasks[0].tasks.push(newTask);

    this.setState({ columnsData: tasks });

    this.togglePopup();
  }

  openPopup = () => {
    this.togglePopup();
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div className="board">
        <header className="board__header">
          <div className="info">{this.state.projectName} Kanban Board</div>
          <div className="filters">
            <div>FILTERS: </div>
            <div className="add-button button" onClick={this.openPopup}>...</div>
          </div>
        </header>

        <BoardColumns columnsData={this.state.columnsData} />

        {this.state.showPopup ?
          <Popup
            text='Close Me'
            addNewTask={this.addNewTask}
            closePopup={this.togglePopup}
          />
          : null
        }

      </div>


    );
  }
}

export default Board;