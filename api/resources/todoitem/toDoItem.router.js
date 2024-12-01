import express from 'express';
import toDoItemController from './toDoItem.controller.js';

export const toDoItemRouter = express.Router();

toDoItemRouter.route('/')
    .get(toDoItemController.findToDoItem)
    .post(toDoItemController.createToDoItem)
    .put(toDoItemController.updateToDoItem)
    .delete(toDoItemController.deleteToDoItem);

toDoItemRouter.route('/all')
    .get(toDoItemController.findToDoItems);