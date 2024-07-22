import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStories } from "../store/story.actions";

export function StoryIndex() {
  const stories = useSelector((storeState) => storeState.storyModule.stories);
  useEffect(() => {
    loadStories();
  }, []);
  console.log(stories);
  return <div className="story-index"> story index</div>;
}
