import mongoose from 'mongoose';
import config from 'config-dug';

beforeAll(async () => {
  await mongoose.connect(config.MONGO_URI.toString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

const deleteAllCollections = async () => {
  const collections = await mongoose.connection.db
    .listCollections()
    .toArray();

  const deleteTasks = collections.map((x: { name: string }) => mongoose.connection.db
    .collection(x.name)
    .deleteMany({}));

  return Promise.all(deleteTasks);
};

afterEach(async () => {
  await deleteAllCollections();
});
