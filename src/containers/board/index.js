import React, { Component } from 'react';
import './Board.scss';
import uuidv1 from 'uuid/v1';

import BoardColumns from '../../components/board-columns/';
import Popup from '../../components/popup/';
import { MODE } from '../../common/constants.js';


class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectName: "Test",
      processStages: [
        {
          id: uuidv1(),
          title: "TO DO",
          value: "toDO",
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
          value: "inProgress",
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
          value: "codeRewiew",
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
          value: "done",
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

    //collect short information about kunbun stages
    const processStagesInfo = this.state.processStages.map(stage => {
      return {
        id: stage.id,
        title: stage.title,
        value: stage.value
      };
    });
    //freeze properties of the processStagesInfo obj
    Object.freeze(processStagesInfo);

    //add processStagesInfo to 
    this.processStagesInfo = processStagesInfo;
  }

  //open popup for creating a new task or for editing some existing task
  openPopup = ({ taskId, stageId } = {}) => {
    this.togglePopup({
      currentMode: (taskId && stageId) ? MODE.editing : MODE.creating,
      currentTask: { taskId: taskId, stageId: stageId }
    });
  }

  togglePopup = (objToMerge = {}) => {
    let newState = Object.assign(objToMerge, { showPopup: !this.state.showPopup })
    this.setState(newState);
  }

  getStageDataById = (stageId, processStagesData = this.state.processStages) => {
    try {
      return processStagesData.find(col => col.id === stageId);
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  getTaskInfoById = (taskId) => {
    const currentStage = this.getStageDataById(this.state.currentTask.stageId);
    let task;

    if (currentStage) {
      try {
        task = currentStage.tasks.find(task => task.id === this.state.currentTask.taskId);
      } catch (e) {
        console.error(e);
      }
    }

    return {
      stageId: (currentStage && currentStage.id) || this.processStagesInfo[0].id,
      title: (task && task.title) || "",
      description: (task && task.description) || ""
    }
  }

  saveTask = (taskToSave) => {

    const taskFromState = this.state.currentTask; // get the current task from the state
    const isEditingMode = this.state.currentMode === MODE.editing;

    const newTaskInfo = {
      title: taskToSave && taskToSave.title,
      description: taskToSave && taskToSave.description,
      id: isEditingMode ? taskFromState.taskId : uuidv1()
    };

    //state should be updated if a new task has been created or an existing task has been changed
    let shoudStateBeUpdated = !isEditingMode ||
      taskFromState.id !== newTaskInfo.id ||
      taskFromState.title !== newTaskInfo.title ||
      taskFromState.stageId !== newTaskInfo.stageId;

    let newState = {};

    if (shoudStateBeUpdated) {

      //copy the previous state to change it
      const processStages = this.state.processStages.slice();

      if (isEditingMode) {

        try {
          let taskFromStateCategory = this.getStageDataById(taskFromState.stageId, processStages);
          const taskFromStateIndex = taskFromStateCategory.tasks.findIndex(task => task.id === taskFromState.taskId);

          //if a stage of the task was changed
          if (taskFromState.stageId !== taskToSave.stageId) {
            //add the task into the new stage
            let taskToSaveCategory = this.getStageDataById(taskToSave.stageId, processStages);
            taskToSaveCategory.tasks.push(newTaskInfo);

            //remove the task from the previous stage 
            taskFromStateCategory.tasks.splice(taskFromStateIndex, 1);

          } else {
            //update task
            taskFromStateCategory.tasks[taskFromStateIndex] = newTaskInfo;
          }

        } catch (e) {
          console.error(e);
        }

      } else { //in case of MODE.creating
        //add a new task to the first column (TO DO)
        processStages[0].tasks.push(newTaskInfo);
      }

      newState = {
        processStages: processStages,
        currentMode: undefined, //clean information about the current mode
        currentTask: {} // and the current task
      }
    }

    //QUESTION: should I merge all state properties first to set new state?
    this.togglePopup(newState); //close popup in this case
  }

  render() {
    const currentState = this.state;

    return (
      <div className="board">
        <header className="board__header">
          <div className="board__header__heading">{currentState.projectName} Kanban Board</div>
          <div className="board__controls">
            <div className="filters">FILTERS: </div>
            <div className="button add-button" onClick={() => this.openPopup()}>...</div>
          </div>
        </header>

        <BoardColumns processStages={currentState.processStages} openPopup={this.openPopup} columnsAmount={currentState.processStages.length} />

        {currentState.showPopup ?
          <Popup
            text={currentState.currentMode === MODE.editing ? "Edit the task" : "Create a new task"}
            task={this.getTaskInfoById(currentState.currentTask.taskId)}
            saveTask={this.saveTask}
            closePopup={this.togglePopup}
            mode={currentState.currentMode}
            processStagesInfo={this.processStagesInfo}
          />
          : null
        }

      </div>
    );
  }
}

export default Board;