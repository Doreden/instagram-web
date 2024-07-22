import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
import { userService } from "./user.service";

const STORAGE_KEY = "story";

export const storyService = {
  query,
  getById,
  save,
  remove,
  getEmptyStory,
  addStoryMsg,
};
window.cs = storyService;

_createStories();

async function query() {
  var stories = await storageService.query(STORAGE_KEY);

  return stories;
  // if (filterBy.txt) {
  //   const regex = new RegExp(filterBy.txt, "i");
  //   stories = stories.filter(
  //     (story) => regex.test(story.vendor) || regex.test(story.description)
  //   );
  // }
  // if (filterBy.price) {
  //   stories = stories.filter((story) => story.price <= filterBy.price);
}

// Return just preview info about the boards
// stories = stories.map(({ _id, vendor, price, owner }) => ({
//   _id,
//   vendor,
//   price,
//   owner,
// }));
// return stories;

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

function _createStories() {
  let stories = utilService.loadFromStorage(STORAGE_KEY);
  if (!stories || !stories.length) {
    stories = [
      {
        _id: "s101",
        txt: "Best trip ever",
        timestamp: 1719392425000,
        imgUrl: "img/profile/p1/story/s3.jpg",
        by: {
          _id: "u101",
          fullname: "Maurizio Ghiraldi",
          username: "Maurizio.Ghir1",
          imgUrl: "img/profile/p1/p1.jpg",
        },
        comments: [
          {
            id: "c101",
            by: {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg",
            },
            txt: "good one!",
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg",
            },
            txt: "Wow!",
          },
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Kingsly Traylen",
            username: "Kingsly123",
            imgUrl: "img/profile/p5/p5.jpg",
          },
          {
            _id: "u105",
            fullname: "Kingsly Traylen",
            username: "Kingsly123",
            imgUrl: "img/profile/p5/p5.jpg",
          },
        ],
        tags: ["fun", "romantic"],
      },
      {
        _id: "s102",
        txt: "sport for life!",
        timestamp: 1687183225000,
        imgUrl: "img/profile/p6/story/s1.jpg",
        by: {
          _id: "u106",
          fullname: "Sabina Duxbury",
          username: "Sabina_Dux28",
          imgUrl: "img/profile/p6/p6.jpg",
        },
        comments: [
          {
            id: "c101",
            by: {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg",
            },
            txt: "good one!",
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Maurizio Ghiraldi",
              username: "Maurizio.Ghir1",
              imgUrl: "img/profile/p6/p6.jpg",
            },
            txt: "Looks great!",
          },
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Kingsly Traylen",
            username: "Kingsly123",
            imgUrl: "img/profile/p5/p5.jpg",
          },
        ],
        tags: ["sport", "romantic"],
      },
      {
        _id: "s103",
        txt: "Best trip ever",
        timestamp: 1681924525000,
        imgUrl: "img/profile/p2/story/s2.jpg",
        by: {
          _id: "u102",
          fullname: "Lorry Tenby",
          username: "Lorryyyy",
          imgUrl: "img/profile/p2/p2.jpg",
        },
        comments: [
          {
            id: "c101",
            by: {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg",
            },
            txt: "good one!",
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg",
            },
            txt: "Love you!",
          },
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Kingsly Traylen",
            username: "Kingsly123",
            imgUrl: "img/profile/p5/p5.jpg",
          },
          {
            _id: "u106",
            fullname: "Sabina Duxbury",
            username: "Sabina_Dux28",
            imgUrl: "img/profile/p6/p6.jpg",
          },
        ],
        tags: ["fun", "romantic"],
      },
      {
        _id: "s104",
        txt: "Love",
        timestamp: 1679238025000,
        imgUrl: "img/profile/p4/story/s1.jpg",
        by: {
          _id: "u104",
          fullname: "Cort Guion",
          username: "Cort258",
          imgUrl: "img/profile/p4/p4.jpg",
        },
        comments: [
          {
            id: "c101",
            by: {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg",
            },
            txt: "wow",
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg",
            },
            txt: "good one!",
          },
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Kingsly Traylen",
            username: "Kingsly123",
            imgUrl: "img/profile/p5/p5.jpg",
          },
          {
            _id: "u102",
            fullname: "Lorry Tenby",
            username: "Lorryyyy",
            imgUrl: "img/profile/p2/p2.jpg",
          },
        ],
        tags: ["fun", "romantic"],
      },
      {
        _id: "s105",
        txt: "good vibes!",
        timestamp: 1719392425000,
        imgUrl: "img/profile/p10/story/s1.jpg",
        by: {
          _id: "u10",
          fullname: "benel Aharon",
          username: "ben_aharon",
          imgUrl: "img/profile/p10/p10.jpg",
        },
        comments: [
          {
            id: "c101",
            by: {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg",
            },
            txt: "good one!",
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg",
            },
            txt: "Wow!",
          },
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Kingsly Traylen",
            username: "Kingsly123",
            imgUrl: "img/profile/p5/p5.jpg",
          },
          {
            _id: "u106",
            fullname: "Sabina Duxbury",
            username: "Sabina_Dux28",
            imgUrl: "img/profile/p6/p6.jpg",
          },
        ],
        tags: ["fun", "romantic"],
      },
      {
        _id: "s106",
        txt: "Best trip!",
        timestamp: 1719392425000,
        imgUrl: "img/profile/p10/story/s2.jpg",
        by: {
          _id: "u10",
          fullname: "benel Aharon",
          username: "ben_aharon",
          imgUrl: "img/profile/p10/p10.jpg",
        },
        comments: [
          {
            id: "c101",
            by: {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg",
            },
            txt: "Amazing!",
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg",
            },
            txt: "Enjoy",
          },
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Kingsly Traylen",
            username: "Kingsly123",
            imgUrl: "img/profile/p5/p5.jpg",
          },
          {
            _id: "u106",
            fullname: "Sabina Duxbury",
            username: "Sabina_Dux28",
            imgUrl: "img/profile/p6/p6.jpg",
          },
        ],
        tags: ["view", "travel"],
      },
      {
        _id: "s107",
        txt: "Cook and love",
        timestamp: 1719392425000,
        imgUrl: "img/profile/p10/story/s3.jpg",
        by: {
          _id: "u10",
          fullname: "benel Aharon",
          username: "ben_aharon",
          imgUrl: "img/profile/p10/p10.jpg",
        },
        comments: [
          {
            id: "c101",
            by: {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg",
            },
            txt: "looks great!",
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg",
            },
            txt: "wow",
          },
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Kingsly Traylen",
            username: "Kingsly123",
            imgUrl: "img/profile/p5/p5.jpg",
          },
          {
            _id: "u106",
            fullname: "Sabina Duxbury",
            username: "Sabina_Dux28",
            imgUrl: "img/profile/p6/p6.jpg",
          },
        ],
        tags: ["cook"],
      },
      {
        _id: "s108",
        txt: "vaction",
        timestamp: 1719392425000,
        imgUrl: "img/profile/p10/story/s4.jpg",
        by: {
          _id: "u10",
          fullname: "benel Aharon",
          username: "ben_aharon",
          imgUrl: "img/profile/p10/p10.jpg",
        },
        comments: [
          {
            id: "c101",
            by: {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg",
            },
            txt: "Amazing!",
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg",
            },
            txt: "nice shots",
          },
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Kingsly Traylen",
            username: "Kingsly123",
            imgUrl: "img/profile/p5/p5.jpg",
          },
          {
            _id: "u106",
            fullname: "Sabina Duxbury",
            username: "Sabina_Dux28",
            imgUrl: "img/profile/p6/p6.jpg",
          },
        ],
        tags: ["view", "travel"],
      },
    ];
  }
  utilService.saveToStorage(STORAGE_KEY, stories);
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
