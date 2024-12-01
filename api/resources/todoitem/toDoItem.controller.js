import ToDoItem from './toDoItem.model.js';

const EXISTS = 'EXISTS';
const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';
const NOT_FOUND = 'NOT_FOUND';

export default {

    // Create a user
    async createToDoItem(req, res) {

        try {

            const foundItem = await ToDoItem.findOne({ name: req.body.name });
            if (!foundItem) {
                const item = await ToDoItem.create(req.body);
                return res.send({ message: SUCCESS, data: item });
            } else {
                return res.send({ message: EXISTS });
            }
        } catch (error) {

            return res.status(500).send(error);
        }
    },

    // Get all users
    async findToDoItems(req, res) {
        try {
            const toDoItems = await ToDoItem.find();
            return res.send({ message: SUCCESS, data: toDoItems });
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    // Find user by Id
    async findToDoItem(req, res) {
        try {
            const foundItem = await ToDoItem.findOne({ _id: req.query.id });
            if (foundItem) {
                return res.send({ message: SUCCESS, data: foundItem });
            } else {
                return res.send({ message: NOT_FOUND });
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    // Update user
    async updateToDoItem(req, res) {
        try {
            let item = {
                name: req.body.name,
                completed: req.body.completed
            };
            const updatedItem = await ToDoItem.findOneAndUpdate({ _id: req.body._id }, item, { new: true });
            if (updatedItem) {
                return res.send({ message: SUCCESS, data: updatedItem });
            } else {
                return res.send({ message: FAILED });
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    // Delete user by Id
    async deleteToDoItem(req, res) {
        try {
            const deletedItem = await ToDoItem.findByIdAndRemove(req.query.id)
            if (deletedItem) {
                return res.send({ message: SUCCESS });
            } else {
                return res.send({ message: FAILED });
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}