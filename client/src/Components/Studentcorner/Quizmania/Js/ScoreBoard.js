import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/ScoreBoard.css";
import NewBoard1 from "../Asset/Newborad1.webp";
import NewBoard2 from "../Asset/Newborad2.webp";
import NewBoard3 from "../Asset/Newborad3.webp";

function ScoreBoard() {
  const [userData, setUserData] = useState([]);

  function getImageSource(index) {
    switch (index) {
      case 1:
        return NewBoard1;
      case 2:
        return NewBoard2;
      case 3:
        return NewBoard3;
      default:
        return ""; // Provide a default image source if needed
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_IPCONFIG}allResult`
        );
        // const json = await res.data;
        setUserData(res.data.rows);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const processedData = userData.map((user) => {
    const topicIds = user.topicid.split(",");
    const marks = user.mark.split(",");
    const uniqueTopics = {};
    topicIds.forEach((topic, index) => {
      if (!uniqueTopics[topic]) {
        uniqueTopics[topic] = marks[index];
      }
    });

    const totalMarks = Object.values(uniqueTopics).reduce(
      (total, mark) => total + parseInt(mark),
      0
    );

    return {
      ...user,
      topicid: Object.keys(uniqueTopics),
      mark: Object.values(uniqueTopics),
      totalTopics: Object.keys(uniqueTopics).length,
      totalMarks: totalMarks,
    };
  });

  // Sort the data based on total marks and total topics
  processedData.sort((a, b) => {
    if (a.totalMarks !== b.totalMarks) {
      return b.totalMarks - a.totalMarks; // Sort by total marks in descending order
    } else {
      return b.totalTopics - a.totalTopics; // Sort by total topics in descending order if total marks are the same
    }
  });

  return (
    <>
      <div className="scoreBoard-container">
        <div className="title">LEADER BOARD</div>
                <div className="TopBoard">
          {processedData.slice(0, 3).map((user, index) => (
            <div className="positions" key={user.userid}>
              {/* <div>{index + 1}</div> */}
             <div className="rankImg"><img src={getImageSource(index + 1)} alt="" /></div>
              <div className="rankHolderDetail">
                <div className="holderName">{user.name}</div>
                <div className="holderMark">{user.totalMarks}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="gridBoard">
          {processedData.slice(3, 10).map((user, index) => (
            <div className="playerTag" key={user.userid}>
              <div className="rank">{index + 4}.</div>
              <div className="rankName">{user.name}</div>
              <div className="totalMarks">{user.totalMarks}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ScoreBoard;

