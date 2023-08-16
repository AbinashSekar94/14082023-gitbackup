import React, { useEffect, useState } from 'react'
import axios from "axios";
import "../Styles/ScoreTest.css";

function ScoreTest() {
    const [userData, setUserData] = useState([]); 

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_IPCONFIG}allResult`);
          // const json = await res.data;
          setUserData(res.data.rows);
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    const processedData = userData.map(user => {
        const topicIds = user.topicid.split(',');
        const marks = user.mark.split(',');
    
        const uniqueTopics = {};
        topicIds.forEach((topic, index) => {
          if (!uniqueTopics[topic]) {
            uniqueTopics[topic] = marks[index];
          }
        });
    
        const totalMarks = Object.values(uniqueTopics).reduce((total, mark) => total + parseInt(mark), 0);
    
        return {
          ...user,
          topicid: Object.keys(uniqueTopics),
          mark: Object.values(uniqueTopics),
          totalTopics: Object.keys(uniqueTopics).length,
          totalMarks: totalMarks
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
        <div>
          {processedData.map((user, index) => (
            <div key={user.userid}>
              <h6>Rank: {index + 1}</h6>
              <h6>{user.name}</h6>
              <p>Total Topics: {user.totalTopics}</p>
              <p>Total Marks: {user.totalMarks}</p>
              
            </div>
          ))}
        </div>
      );
    }

export default ScoreTest