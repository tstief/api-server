import ToDoItem from '../api/resources/todoitem/toDoItem.model.js';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

chai.use(chaiAsPromised);
chai.should();

describe('ToDoItem', () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await ToDoItem.deleteMany({});
  })

  describe('#save()', () => {
    it('should fail with no properties', async () => {
      const item = new ToDoItem({});
      item.save().should.eventually.rejectedWith("ToDoItem validation failed: name: Path `name` is required.");
    });

    it('should fail without name', async () => {
      const item = new ToDoItem({ completed: false });
      item.save().should.eventually.rejectedWith("ToDoItem validation failed: name: Path `name` is required.");
    });

    it('should save without error', async () => {
      const item = new ToDoItem({ name: 'Foo', completed: true });
      await item.save();
      item.name.should.equal('Foo');
      item.completed.should.equal(true);
    });

    it('saves with completed default to false', async () => {
      const item = new ToDoItem({ name: 'Bar' });
      await item.save();
      item.name.should.equal('Bar');
      item.completed.should.equal(false);
    });
  });
});