import { carService } from "../services/story.service.local";
import { store } from "../store/store";
import {
  ADD_STORY,
  REMOVE_STORY,
  SET_STORYS,
  SET_STORY,
  UPDATE_STORY,
  ADD_STORY_MSG,
} from "./story.reducer";

export async function loadStorys() {
  try {
    const cars = await carService.query();
    console.log("Storys from DB:", cars);
    store.dispatch(getCmdSetStorys(cars));
  } catch (err) {
    console.log("Cannot load cars", err);
    throw err;
  }
}

export async function loadStory(carId) {
  try {
    const story = await carService.getById(carId);
    console.log("story from DB:", story);
    store.dispatch(getCmdSetStory(story));
  } catch (err) {
    console.log("Cannot load story", err);
    throw err;
  }
}

export async function removeStory(carId) {
  try {
    await carService.remove(carId);
    store.dispatch(getCmdRemoveStory(carId));
  } catch (err) {
    console.log("Cannot remove story", err);
    throw err;
  }
}

export async function addStory(story) {
  try {
    const savedStory = await carService.save(story);
    console.log("Added story", savedStory);
    store.dispatch(getCmdAddStory(savedStory));
    return savedStory;
  } catch (err) {
    console.log("Cannot add story", err);
    throw err;
  }
}

export async function updateStory(story) {
  try {
    const savedStory = await carService.save(story);
    console.log("Updated story:", savedStory);
    store.dispatch(getCmdUpdateStory(savedStory));
    return savedStory;
  } catch (err) {
    console.log("Cannot save story", err);
    throw err;
  }
}

export async function addStoryMsg(carId, txt) {
  try {
    const msg = await carService.addStoryMsg(carId, txt);
    console.log("Added story message", msg);
    store.dispatch(getCmdAddStoryMsg(msg));
    return msg;
  } catch (err) {
    console.log("Cannot add story msg", err);
    throw err;
  }
}

// Command Creators:
function getCmdSetStorys(cars) {
  return {
    type: SET_STORYS,
    cars,
  };
}
function getCmdSetStory(story) {
  return {
    type: SET_STORY,
    story,
  };
}
function getCmdRemoveStory(carId) {
  return {
    type: REMOVE_STORY,
    carId,
  };
}
function getCmdAddStory(story) {
  return {
    type: ADD_STORY,
    story,
  };
}
function getCmdUpdateStory(story) {
  return {
    type: UPDATE_STORY,
    story,
  };
}
function getCmdAddStoryMsg(msg) {
  return {
    type: ADD_STORY_MSG,
    msg,
  };
}

// unitTestActions()
async function unitTestActions() {
  await loadStorys();
  await addStory(carService.getEmptyStory());
  await updateStory({
    _id: "m1oC7",
    title: "story-Good",
  });
  await removeStory("m1oC7");
  // TODO unit test addStoryMsg
}
