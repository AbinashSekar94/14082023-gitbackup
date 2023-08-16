import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Topic.css";
// import Advertisment from "../Asset/Ad.png";

import XQILogo from "../Asset/XQILogo.png"
import RectangleTag from "../Asset/RectangleTag.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Topic(props) {
  const [topic, setTopic] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [fetchedTopicId, setFetchedTopicId] = useState([]);
  const [fetchedScore, setFetchedScore] = useState([]);
  const categorys = JSON.parse(sessionStorage.getItem("Categorys"));
  const categories = JSON.parse(sessionStorage.getItem("fetchedCategories"));
  const navigate = useNavigate();
  const [categor, setCategor] = useState(categorys);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const userProfileInfo = userInfo;
  const Level = userProfileInfo.level;
  const userResId = userProfileInfo.userid;
  // const [categor, setCategor] = useState(
  //   categorys !== null && categorys !== undefined ? "GK" : categorys
  // );

  function handleCategorySubmit(event) {
    setCategor(event);
    props.setCategor(event);
  }

  function handleTopicSubmit(top, cate, topid) {
    setTopic(top);
    props.setTopic(top);
    sessionStorage.setItem("topic", JSON.stringify(top));
    setCategor(cate);
    props.setCategor(cate);
    sessionStorage.setItem("categor", JSON.stringify(cate));
    sessionStorage.setItem("topicid", JSON.stringify(topid));
    navigate("/Quiz");
  }

  // function handleCloseDialog() {
  //   setShowDialog(false);
  // }

  useEffect(() => {
    const fetchTopicId = async () => {
      try {
        if (userResId) {
          const response = await axios.post(
            `${process.env.REACT_APP_IPCONFIG}topic/topicid`,
            {
              userid: userResId,
            }
          );
          setFetchedTopicId(response.data[0].topicid.split(","));
          setFetchedScore(response.data[0].mark.split(","));
        }
      } catch (error) {
        console.log(error);
      }
      AOS.init();
    };
    fetchTopicId();
  }, [userResId]);

  // const topicIds = fetchedTopicId.split(',');
  // console.log(fetchedTopicId);
  // console.log(fetchedScore);

  // const marks = fetchedTopicId.map((topicid, index) => {
  //   return { [topicid]: fetchedScore[index] };
  // });

  // console.log(marks);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        if (categor) {
          const response = await axios.post(`${process.env.REACT_APP_IPCONFIG}topic`, {
            category: categor,
            level: Level,
          });
          setTopic(response.data);
         
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopic();
  }, [categor, Level]);

  return (
    <div>
      <div className="Ad-R-1">
        <div className="categoryBar">
          {categories.map((category, index) => (
            <button
              className={`topic-btn1${
                categor === category.category ? " active" : ""
              }`}
              key={index}
              onClick={() => handleCategorySubmit(category.category)}
            >
              {category.category}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-container1">
        <div className="flex-content1">
          <div className="firstRow1">
            {/* <div className="heading">{categor}</div> */}
            <div className="box" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
              {topic.map((topic, index) => (
                <React.Fragment key={index}>
                  <div className="topic-div">
                    <div className="rectangleholder">
                      <img className="rectangleTag" src={RectangleTag} alt="" />
                      <div id="no">{index + 1}</div>
                    </div>

                    <div className="topicHeading">{topic.topic}</div>
                    <div className="topic-timeBtn">
                      {/* <div className="time">{topic.topicid}</div> */}
                      <div className="time">10 Questions 10 min</div>
                      <button
                        className={`topic-btn${
                          categor === topic.category ? " active" : ""
                        }`}
                        onClick={() =>
                          setShowDialog({
                            show: true,
                            topic: topic.topic,
                            category: topic.category,
                            topicid: topic.topicid,
                          })
                        }
                        disabled={fetchedTopicId.includes(topic.topicid)}
                      >
                        {fetchedTopicId.includes(topic.topicid)
                          ? `Score: ${
                              fetchedScore[
                                fetchedTopicId.indexOf(topic.topicid)
                              ]
                            }`
                          : "Take Test"}
                      </button>

                      {showDialog.show && (
                        <div className="topic-dialog">
                          <div className="topic-dialog-header">
                            {showDialog.topic}
                          </div>
                          <div className="topic-dialog-content">
                            Duration 10 minutes
                          </div>
                          <div className="topic-dialog-content">
                            Maximum Marks: 10
                          </div>
                          <div className="topic-dialog-content">
                            Read The Following instructions Carefully
                          </div>

                          <div className="topic-dialog-content">
                            1: The Test contains 10 Total questions.
                          </div>
                          <div className="topic-dialog-content">
                            2:You’ll finish the test in 10 Minutes{" "}
                          </div>
                          <div className="topic-dialog-content">
                            3:You will be awarded 1 mark for each correct
                            answer.
                          </div>
                          <div className="topic-dialog-content">
                            4:There is no negative marking{" "}
                          </div>
                          <div className="topic-dialog-content">
                            5.You can view your score & test after submitting
                            your test
                          </div>
                          <div className="topic-dialog-content">
                            6: Check the solution and with detail explanation
                            after submission
                          </div>
                          <div className="topic-dialog-content">
                            7: Rank is calculate on the basic of Marks scored &
                            Time
                          </div>

                          <div className="topic-dialog-btn">
                            <button onClick={() => setShowDialog(false)}>
                              Cancel
                            </button>
                            <button
                              onClick={() =>
                                handleTopicSubmit(
                                  showDialog.topic,
                                  showDialog.category,
                                  showDialog.topicid
                                )
                              }
                            >
                              Start Test
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                </React.Fragment>
              ))}
            </div>
            <div className="div-in-between1">
            <div className="text1">Questions are sponsered by  </div>
            <img src={XQILogo} alt=""></img>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Topic;
