import { useState, useEffect } from "react";

import axios from "axios";

import "../Styles/status.css";

import Stories from "react-insta-stories";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faTimes } from "@fortawesome/free-solid-svg-icons";

import Profile from "../Assest/profile.png";

const StoryComponent = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  function cancelclick() {
    navigate("/");
  }

  const fallbackImage = Profile;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_IPCONFIG}status/filename`
        );

        const data = response.data;

        setFiles(data.files);

        console.log(data.files, "file value");
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const Vetrikodiprofile = {
    heading: "Vetrikkodi",

    profileImage: Profile,
  };

  useEffect(() => {
    if (!files || files.length === 0) {
      setStories([{ url: fallbackImage, header: Vetrikodiprofile }]);

      return;
    }

    const initialStories = files.map((file) => ({
      url: `https://staticvk.hindutamil.in/vetrikkodi/${file}`,

      header: Vetrikodiprofile,
    }));

    setStories(initialStories);
  }, [files]);

  const [stories, setStories] = useState([]);

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const onAllStoriesEndHandler = () => {
    console.log("stories ended");
  };

  const storyContent = {
    width: "auto",

    maxWidth: "100%",

    maxHeight: "200%",

    margin: "auto",
  };

  const storyBackground = {
    // backgroundColor: `rgba(0,0,0,0.8)`,

    backgroundImage: `url(${stories[currentStoryIndex]?.url || fallbackImage})`,

    backgroundSize: "cover",

    backgroundRepeat: "no-repeat",

    backgroundPosition: "center",
  };

  const storyOverlay = {
    position: "absolute",

    width: "100%",

    height: "100%",

    top: 0,

    left: 0,

    backgroundColor: `rgba(0,0,0,0.9)`,

    filter: "blur(50px)",
  };

  const onStoryStartHandler = (index) => {
    setCurrentStoryIndex(index);
  };

  const onStoryEndHandler = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  return (
    <>
      <div className="story_canceller">
        <FontAwesomeIcon
          icon={faTimes}
          onClick={cancelclick}
          className="fa-beat"
          size="lg"
          style={{ marginLeft: "30%" }}
        />
      </div>

      <div className="story" style={storyBackground}>
        <div className="story-overlay" style={storyOverlay}></div>

        <div className="stories">
          {stories.length > 0 && (
            <Stories
              stories={stories}
              defaultInterval={5000}
              width={"100%"}
              height={"100vh"}
              style={{
                display: "flex",

                justifyContent: "center",

                cursor: "pointer",
              }}
              storyStyles={storyContent}
              loop={true}
              keyboardNavigation={true}
              isPaused={() => {}}
              currentIndex={currentStoryIndex}
              onStoryStart={onStoryStartHandler}
              onStoryEnd={onStoryEndHandler}
              onAllStoriesEnd={onAllStoriesEndHandler}
              seeMoreCloseButton={<div style={{ color: "red" }}>Close</div>}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default StoryComponent;
