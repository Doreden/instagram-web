export const SET_STORYS = "SET_STORYS";
export const SET_STORY = "SET_STORY";
export const REMOVE_STORY = "REMOVE_STORY";
export const ADD_STORY = "ADD_STORY";
export const UPDATE_STORY = "UPDATE_STORY";
export const ADD_STORY_MSG = "ADD_STORY_MSG";

const initialState = {
  cars: [],
  story: null,
};

export function carReducer(state = initialState, action) {
  var newState = state;
  var cars;
  switch (action.type) {
    case SET_STORYS:
      newState = { ...state, cars: action.cars };
      break;
    case SET_STORY:
      newState = { ...state, story: action.story };
      break;
    case REMOVE_STORY:
      const lastRemovedStory = state.cars.find(
        (story) => story._id === action.carId
      );
      cars = state.cars.filter((story) => story._id !== action.carId);
      newState = { ...state, cars, lastRemovedStory };
      break;
    case ADD_STORY:
      newState = { ...state, cars: [...state.cars, action.story] };
      break;
    case UPDATE_STORY:
      cars = state.cars.map((story) =>
        story._id === action.story._id ? action.story : story
      );
      newState = { ...state, cars };
      break;
    case ADD_STORY_MSG:
      newState = {
        ...state,
        story: {
          ...state.story,
          msgs: [...(state.story.msgs || []), action.msg],
        },
      };
      break;
    default:
  }
  return newState;
}

// unitTestReducer()

function unitTestReducer() {
  var state = initialState;
  const car1 = {
    _id: "b101",
    vendor: "story " + parseInt(Math.random() * 10),
    msgs: [],
  };
  const car2 = {
    _id: "b102",
    vendor: "story " + parseInt(Math.random() * 10),
    msgs: [],
  };

  state = carReducer(state, { type: SET_STORYS, cars: [car1] });
  console.log("After SET_STORYS:", state);

  state = carReducer(state, { type: ADD_STORY, story: car2 });
  console.log("After ADD_STORY:", state);

  state = carReducer(state, {
    type: UPDATE_STORY,
    story: { ...car2, vendor: "Good" },
  });
  console.log("After UPDATE_STORY:", state);

  state = carReducer(state, { type: REMOVE_STORY, carId: car2._id });
  console.log("After REMOVE_STORY:", state);

  const msg = { id: "m" + parseInt(Math.random() * 100), txt: "Some msg" };
  state = carReducer(state, { type: ADD_STORY_MSG, carId: car1._id, msg });
  console.log("After ADD_STORY_MSG:", state);

  state = carReducer(state, { type: REMOVE_STORY, carId: car1._id });
  console.log("After REMOVE_STORY:", state);
}
