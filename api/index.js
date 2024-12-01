import express from 'express';
import { toDoItemRouter } from './resources/todoitem/index.js';

export const restRouter = express.Router();

restRouter.use('/toDoItem', toDoItemRouter);