import { storyService } from "../services/story.service.local";
import { store } from "./store";
import {
  ADD_STORY,
  REMOVE_STORY,
  SET_STORIES,
  SET_STORY,
  UPDATE_STORY,
  ADD_STORY_MSG,
} from "./story.reducer";

export async function loadStories() {
  try {
    const stories = await storyService.query();
    console.log("stories from DB:", stories);
    store.dispatch(getCmdSetStorys(stories));
  } catch (err) {
    console.log("Cannot load stories", err);
    throw err;
  }
}

export async function loadStory(storyId) {
  try {
    const story = await storyService.getById(storyId);
    console.log("story from DB:", story);
    store.dispatch(getCmdSetStory(story));
  } catch (err) {
    console.log("Cannot load story", err);
    throw err;
  }
}

export async function removeStory(storyId) {
  try {
    await storyService.remove(storyId);
    store.dispatch(getCmdRemoveStory(storyId));
  } catch (err) {
    console.log("Cannot remove story", err);
    throw err;
  }
}

export async function addStory(story) {
  try {
    const savedStory = await storyService.save(story);
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
    const savedStory = await storyService.save(story);
    console.log("Updated story:", savedStory);
    store.dispatch(getCmdUpdateStory(savedStory));
    return savedStory;
  } catch (err) {
    console.log("Cannot save story", err);
    throw err;
  }
}

export async function addStoryMsg(storyId, txt) {
  try {
    const msg = await storyService.addStoryMsg(storyId, txt);
    console.log("Added story message", msg);
    store.dispatch(getCmdAddStoryMsg(msg));
    return msg;
  } catch (err) {
    console.log("Cannot add story msg", err);
    throw err;
  }
}

// Command Creators:
function getCmdSetStorys(stories) {
  return {
    type: SET_STORIES,
    stories,
  };
}
function getCmdSetStory(story) {
  return {
    type: SET_STORY,
    story,
  };
}
function getCmdRemoveStory(storyId) {
  return {
    type: REMOVE_STORY,
    storyId,
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
  await addStory(storyService.getEmptyStory());
  await updateStory({
    _id: "m1oC7",
    title: "story-Good",
  });
  await removeStory("m1oC7");
  // TODO unit test addStoryMsg
}
