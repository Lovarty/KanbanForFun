import React, { Component } from 'react';
import './App.css';
import uuidv1 from 'uuid/v1';

import BoardColumns from './components/board-columns';
import Popup from './components/popup';
import { MODE } from './common/constants';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectName: "Test",
      processStages: [
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
      showPopup: false,
      currentMode: undefined,
      currentTask: {}
    }
  }

  saveTask = (task) => {
    const currentTask = this.state.currentTask;
    const newTask = {
      title: task && task.title,
      description: task && task.description,
      id: this.state.currentMode === MODE.editing ? currentTask.taskId : uuidv1()
    };

    const processStages = this.state.processStages.slice();
    let shoudStateBeUpdated = false;

    if (this.state.currentMode === MODE.editing) {
      try {
        let taskCategory = this.getCategoryDataById(currentTask.categoryId, processStages);
        const currentTaskIndex = taskCategory.tasks.findIndex(task => task.id === currentTask.taskId);
        const previousTask = taskCategory.tasks[currentTaskIndex];
        if (previousTask.title !== newTask.title || previousTask.description !== newTask.description) {
          taskCategory.tasks[currentTaskIndex] = newTask;
          shoudStateBeUpdated = true;
        }

      } catch (e) {
        console.error(e);
      }

    } else {
      processStages[0].tasks.push(newTask);
      shoudStateBeUpdated = true;
    }

    shoudStateBeUpdated && this.setState(
      {
        processStages: processStages,
        currentMode: undefined,
        currentTask: {}
      });
    this.togglePopup();
  }

  openPopup = (taskId, categoryId) => {
    this.togglePopup(taskId, categoryId);
  }

  togglePopup = (taskId, categoryId) => {
    this.setState({
      showPopup: !this.state.showPopup,
      currentMode: taskId ? MODE.editing : MODE.creating,
      currentTask: {
        categoryId: categoryId,
        taskId: taskId
      }
    });
  }

  getCategoryDataById = (categoryId, copiedData) => {
    try {
      let categoriesData = copiedData || this.state.processStages;
      return categoriesData.find(col => col.id === categoryId);
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  getTaskById = (taskId) => {
    const currentCategory = this.getCategoryDataById(this.state.currentTask.categoryId);
    let task;

    if (currentCategory) {
      try {
        task = currentCategory.tasks.find(task => task.id === this.state.currentTask.taskId);
      } catch (e) {
        console.error(e);
      }
    }

    return {
      title: (task && task.title) || "",
      description: (task && task.description) || ""
    }
  }

  render() {
    return (
      <div className="board">
        <header className="board__header">
          <div className="info">{this.state.projectName} Kanban Board</div>
          <div className="filters">
            <div>FILTERS: </div>
            <div className="add-button button" onClick={() => this.openPopup()}>...</div>
          </div>
        </header>

        <BoardColumns processStages={this.state.processStages} openPopup={this.openPopup} />

        {this.state.showPopup ?
          <Popup
            text={this.currentMode === MODE.editing ? "Edit the task" : "Create a new task"}
            task={this.getTaskById(this.state.currentTask.taskId)}
            saveTask={this.saveTask}
            closePopup={this.togglePopup}
            mode={this.state.currentMode}
          />
          : null
        }

      </div>


    );
  }
}

export default Board;