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
      assignees: [
        {
          id: 1,
          name: "Anna",
          position: "developer",
          avatar: "koi.png"
        },
        {
          id: uuidv1(),
          name: "Artem",
          position: "developer",
          avatar: "monkey.png"
        },
        {
          id: uuidv1(),
          name: "Ninja",
          position: "tester",
          avatar: "ninja.png"
        },
        {
          id: uuidv1(),
          name: "Sumo",
          position: "tester",
          avatar: "sumo.png"
        },
        {
          id: uuidv1(),
          name: "Robot",
          position: "tester",
          avatar: "robot.png"
        },
        {
          id: uuidv1(),
          name: "Godzilla",
          position: "tester",
          avatar: "godzilla.png"
        },
      ],
      processStages: [
        {
          id: 1,
          title: "TO DO",
          value: "toDO",
          tasks: [
            {
              id: uuidv1(),
              title: "task 1",
              description: "Green green grass",
              assigneeId: 1,
              categoryId: 1
            },
            {
              id: uuidv1(),
              title: "task 2",
              description: "Tralivali",
              categoryId: 1
            },
            {
              id: uuidv1(),
              title: "task 3",
              description: "Pilgrims",
              categoryId: 1
            },
            {
              id: uuidv1(),
              title: "task 47",
              description: "task 47",
              assigneeId: 1,
              categoryId: 1
            },
            {
              id: uuidv1(),
              title: "task 56",
              description: "task 56",
              assigneeId: 1,
              categoryId: 1
            },
            {
              id: uuidv1(),
              title: "task 53",
              description: "task 53",
              assigneeId: 1,
              categoryId: 1
            },
            {
              id: uuidv1(),
              title: "task 25",
              description: "task 25",
              assigneeId: 1,
              categoryId: 1
            },
          ]
        },
        {
          id: 2,
          title: "IN PROGRESS",
          value: "inProgress",
          tasks: [
            {
              id: uuidv1(),
              title: "task 4",
              description: "Maharacheeowa",
              categoryId: 2
            },
            {
              id: uuidv1(),
              title: "task 5",
              description: "Roses are red",
              categoryId: 2
            }
          ]
        },
        {
          id: 3,
          title: "CODE REWIEW",
          value: "codeRewiew",
          tasks: [
            {
              id: uuidv1(),
              title: "task 6",
              description: "Antoshka",
              categoryId: 3
            }
          ]
        },
        {
          id: 4,
          title: "DONE",
          value: "done",
          tasks: [
            {
              id: uuidv1(),
              title: "task 7",
              description: "About making right decisions",
              categoryId: 4
            },
            {
              id: uuidv1(),
              title: "task 8",
              description: "Nothing interesting",
              categoryId: 4
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
      description: (task && task.description) || "",
      assigneeId: (task && task.assigneeId) || ""
    }
  }

  saveTask = (taskToSave) => {
    const taskFromState = this.state.currentTask; // get the current task from the state
    const isEditingMode = this.state.currentMode === MODE.editing;

    const newTaskInfo = {
      title: taskToSave && taskToSave.title,
      description: taskToSave && taskToSave.description,
      id: isEditingMode ? taskFromState.taskId : uuidv1(),
      assigneeId: taskToSave && taskToSave.assigneeId
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
        //TODO check that task was updated

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

  getAssigneeInfoById = (assigneId) => {
    try {
      return this.state.assignees.find(assignee => assignee.id === assigneId);
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  changeTaskStage = (taskId, newCategoryId) => {
    try {
      let allStagesTasks = this.state.processStages.slice();

      //find the previous category
      let prevCategory,
        prevCategoryIndex,
        currentTask,
        currentTaskIndex;


      prevCategory = allStagesTasks.find((category, categoryIndex) => {
        return category.tasks.find((task, taskIndex) => {
          if (task.id === taskId) {
            currentTask = task;
            currentTaskIndex = taskIndex;
            prevCategoryIndex = categoryIndex;
            return true;
          }
          return false;
        });
      });

      //remove the task from its previous stage
      prevCategory.tasks.splice(currentTaskIndex, 1);

      //???
      allStagesTasks[prevCategoryIndex] = prevCategory;

      //find the new category
      let newCategory, newCategoryIndex;

      newCategory = allStagesTasks.find((category, index) => {
        if (category.id === newCategoryId) {
          newCategoryIndex = index;
          return true;
        }
        return false;
      });

      currentTask.categoryId = newCategoryId;

      newCategory.tasks.push(currentTask);

      allStagesTasks[newCategoryIndex] = newCategory;

      this.setState({ processStages: allStagesTasks });
    } catch (e) {
      console.log(e);
    }
  }

  changeTasksOrder = (newTasksOrder, categoryId) => {
    try {
      let allStagesTasks = this.state.processStages.slice();
      let categoryIndex = allStagesTasks.findIndex(category=> category.id === categoryId);
      allStagesTasks[categoryIndex].tasks = newTasksOrder;

      this.setState({ processStages: allStagesTasks });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const currentState = this.state;

    return (
      <div className="board" >
        <header className="board__header">
          <div className="board__header__heading">{currentState.projectName} Kanban Board</div>
          <div className="board__controls">
            <div className="filters">FILTERS: </div>
            <div className="button add-button" onClick={() => this.openPopup()}>...</div>
          </div>
        </header>

        <BoardColumns processStages={currentState.processStages}
          getAssigneeInfoById={this.getAssigneeInfoById}
          openPopup={this.openPopup}
          changeTaskStage={this.changeTaskStage}
          columnsAmount={currentState.processStages.length} />

        {currentState.showPopup ?
          <Popup
            text={currentState.currentMode === MODE.editing ? "Edit the task" : "Create a new task"}
            task={this.getTaskInfoById(currentState.currentTask.taskId)}
            saveTask={this.saveTask}
            closePopup={this.togglePopup}
            mode={currentState.currentMode}
            processStagesInfo={this.processStagesInfo}
            assigneeOptions={currentState.assignees}
            getAssigneeInfoById={this.getAssigneeInfoById} //TODO: think about necessety of this method here
          />
          : null
        }

      </div >
    );
  }
}

export default Board;