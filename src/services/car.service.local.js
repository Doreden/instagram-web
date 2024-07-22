import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
import { userService } from "./user.service";

const STORAGE_KEY = "story";

export const carService = {
  query,
  getById,
  save,
  remove,
  getEmptyStory,
  addStoryMsg,
};
window.cs = carService;

async function query(filterBy = { txt: "", price: 0 }) {
  var cars = await storageService.query(STORAGE_KEY);
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, "i");
    cars = cars.filter(
      (story) => regex.test(story.vendor) || regex.test(story.description)
    );
  }
  if (filterBy.price) {
    cars = cars.filter((story) => story.price <= filterBy.price);
  }

  // Return just preview info about the boards
  cars = cars.map(({ _id, vendor, price, owner }) => ({
    _id,
    vendor,
    price,
    owner,
  }));
  return cars;
}

function getById(carId) {
  return storageService.get(STORAGE_KEY, carId);
}

async function remove(carId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, carId);
}

async function save(story) {
  var savedStory;
  if (story._id) {
    const carToSave = {
      _id: story._id,
      price: story.price,
    };
    savedStory = await storageService.put(STORAGE_KEY, carToSave);
  } else {
    // Later, owner is set by the backend
    const carToSave = {
      vendor: story.vendor,
      price: story.price,
      owner: userService.getLoggedinUser(),
      msgs: [],
    };
    savedStory = await storageService.post(STORAGE_KEY, carToSave);
  }
  return savedStory;
}

async function addStoryMsg(carId, txt) {
  // Later, this is all done by the backend
  const story = await getById(carId);

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  story.msgs.push(msg);
  await storageService.put(STORAGE_KEY, story);

  return msg;
}

function getEmptyStory() {
  return {
    vendor: "Susita-" + utilService.makeId(),
    price: utilService.getRandomIntInclusive(1000, 9000),
    msgs: [],
  };
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
