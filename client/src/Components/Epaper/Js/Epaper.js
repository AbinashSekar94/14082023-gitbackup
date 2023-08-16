import { useState, useEffect } from "react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

//Npm packages
import { useNavigate } from "react-router-dom";
import { Container, Carousel, } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faThumbsUp, faThumbsDown, faShare, faMicrophone, faComment } from "@fortawesome/free-solid-svg-icons";

import Lottie from "lottie-react";
import School from '../Assest/school.json'

import Leave from '../Assest/Leave.png'

import mixpanel from 'mixpanel-browser';

//Css pags and
import "../Styles/epaper.css";
import "../Styles/articleview.css";

export default function ArticleView() {
  const [selectdate, setSelectedDate] = useState(new Date());

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
    toolbarPlugin: (defaultTabs) => [],
    
  })

  mixpanel.init("bab0d935051812b8eac5703f92516f15",{

    debug:true,
    ignore_dnt: true

  })

  //Navbar Button
  const [showDiv1, setShowDiv1] = useState(true);
  const [showDiv2, setShowDiv2] = useState(false);
  const [activeButton, setActiveButton] = useState(1);

  const [showCommentbox, setCommentbox] = useState(false);

  const clickcomment = () => { setCommentbox(true); }
  const closecomment = () => { setCommentbox(false) }


  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.text));
  };

  const handleClick1 = () => {
    setShowDiv1(true);
    setShowDiv2(false);
    setActiveButton(1);
  };

  const handleClick2 = () => {
    setShowDiv1(false);
    setShowDiv2(true);
    setActiveButton(2);
  };

  //--------Atricle view functionality---//

  function dateChange(event) {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    // sessionStorage.setItem("Datevalue", newDate.toISOString().split("T")[0]);
  }

  // const inputDateFormat = 'yyyy-MM-dd'; // Format for the input date value
  const displayDateFormat = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  // Format for the displayed date
  const formattedInputDate = selectdate.toISOString().substr(0, 10);
  console.log(formattedInputDate, "sss");
  const formattedDisplayDate = selectdate.toLocaleDateString("en-US", displayDateFormat);



  //Get Today news
  const [getdata, setGetData] = useState([]);
  console.log(getdata, "got datas");

  //post data news
  const [postdata, setPostData] = useState([]);

  useEffect(() => {
    setPostData(getdata);
  }, [getdata]);

  //selected news
  const [selectnews, setSelectnews] = useState();
  const [selectedItem, setSelectedItem] = useState(0);

  const handleButtonClick = () => {
    setSelectnews("");
    setSelectedItem(0);
  };

  //selected pages
  const [Pages, SetPages] = useState("Front");

  

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = process.env.PUBLIC_URL + "/news/logo.png";
  };

  const currentDate = new Date().toISOString().slice(0, 10);
  console.log(currentDate, "current date data ");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_IPCONFIG}fetchnews?date=${currentDate}`)
      .then((res) => {
        setGetData(res.data);
        console.log(res.data);
      });
  }, []);

  const news = async () => {
    await axios
      .post(`${process.env.REACT_APP_IPCONFIG}postnews`, { Date: formattedInputDate })
      .then((res) => {
        setGetData(res.data.response);
        console.log(res.data.response);
      });

    setSelectnews("");
    setSelectedItem(0);
  };

  const pageselect = async () => {
    await axios
      .post(`${process.env.REACT_APP_IPCONFIG}pagenews`, {
        Date: formattedInputDate,
        Pagename: Pages,
      })
      .then((res) => {
        setGetData(res.data.response);
        console.log(res.data.response, "test3");
      });
  };

  const getid = async (ev) => {
    console.log(ev);
    await axios
      .post(`${process.env.REACT_APP_IPCONFIG}news/id`, { id: ev })
      .then((res) => {
        console.log(res.data.response, "selected news checking");
        setSelectnews(res.data.response);
      });
  };

  //Navigate to a anoter page
  const navigate = useNavigate();

  function statusclick() {
    navigate("/status", { state: { selectnews, postdata } });
    mixpanel.track("status button was clicked by someone")
  }

  function shareclick() {
    let id;
    if (selectnews && selectnews.length > 0 && selectnews[0]._id) {
      id = selectnews[0]._id;
    } else if (postdata && postdata.length > 0 && postdata[0]._id) {
      id = postdata[0]._id;
    } else {
      // Handle the case where neither selectnews nor postdata contain an _id property
      console.log("Error: no _id found");
      return;
    }

    window.open(`/share/${id}`, "_blank");
    console.log(id, "share checksssssssss");
  }

  //text to speech
  const SpeechSynthesis = window.speechSynthesis;
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ta-IN"; // or 'ta-LK'
    SpeechSynthesis.speak(utterance);
  };

  // console.log(speechSynthesis.getVoices());

  const handleSpeakClick = () => {
    setIsSpeaking(true);

    let dataToSpeak;
    if (selectnews && selectnews.length > 0) {
      dataToSpeak = selectnews;
    } else if (postdata && postdata.length > 0) {
      dataToSpeak = [postdata[0]];
    } else {
      console.log("Error: no data found");
      setIsSpeaking(false);
      return;
    }

    dataToSpeak.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (
          key !== "_id" &&
          key !== "Pagename" &&
          key !== "Date" &&
          key !== "Image" &&
          key !== "Image1"
        ) {
          speak(item[key]);
        }
      });
    });

    setIsSpeaking(false);
  };

  const handleStopClick = () => {
    SpeechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleidClick = (index) => {
    setSelectedItem(index);
  };

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [dislike, setdislike] = useState(0);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };
  const handledislike = () => {
    setdislike(dislike + 1);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const commentInput = event.target.elements.commentInput;
    const commentText = commentInput.value;
    setComments([...comments, commentText]);
    commentInput.value = "";
  };

  //--------pdf view functionality---//
  const [pdfUrl, setPdfUrl] = useState(null);
  console.log(pdfUrl);
  const [error, setError] = useState(null);


  const fetchPdf = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_IPCONFIG}api/pdf?date=${formattedInputDate}`,
        {
          responseType: "arraybuffer",
        }
      );
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
      setError(null);
    } catch (err) {
      setPdfUrl(null);
      
      console.log(err.message);
    }
  };
  


  useEffect(() => {
    fetchPdf(formattedInputDate);
  }, []);

  
  

  return (
    <>


      <Container fluid className="listedNav">
        <ul>
          <li className="nav-itemss" onClick={statusclick}  >
            <FontAwesomeIcon icon={faEye} className="fa-beat" size="sm" />
            <span className="nav-text">Today's status</span>
          </li>

          

          <li className="nav-itemss date-item">
            <label className="date-display" htmlFor="date-input">
              <span >{formattedDisplayDate}</span>
              <input id="date-input" type="date" value={selectdate.toISOString().substr(0, 10)}
                className="date-input" onChange={dateChange} onSelect={()=> {fetchPdf(); news() }}
              />
            </label>
          </li>

         

          <li className="nav-itemss date-item">
            <div className="btnview">
              <button className={activeButton === 1 ? "active" : ""} onClick={handleClick1}>
                PDF View
              </button>
              <button className={activeButton === 2 ? "active" : ""} onClick={handleClick2} >
                Article View
              </button>
            </div>
          </li>
        </ul>
      </Container>

      <div >
      
        {showDiv1 && (
          <div>
            <br/>
            <div>
              {pdfUrl ? (
                <center>
                  <div className="pcpdf-viewer">
                    {/* <iframe src={pdfUrl} height={1000} width='70%' /> */}
                     {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js"> */}
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${"^3.9.179"}/build/pdf.worker.min.js`}>
                      <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                  </Worker>
                  </div>

                

                  <div className="mobilepdf-viewer">

                  <Worker workerUrl="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js">
                      <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                  </Worker>

                   </div>

                </center>
              ) : (

                <center>
                 

                  <Lottie animationData={School} loop={true} className="School_animate"/>
                  <img src={Leave} className="Leave_hold"></img>

                </center>
              )}
              {error && <p>{error}</p>}
            </div>
          </div>
        )}

        {showDiv2 && (
          <div>
            <Container>
              <div className="pagesview">
                <ul className="pagination">

                  <li className="page-item" onMouseDown={(e) => SetPages("Front")} onClick={pageselect} onMouseUp={handleButtonClick} >
                    <a href="*" className="page-link" role="button" tabindex="0"> Page 1 </a>
                  </li>

                  <li className="page-item" onMouseDown={(e) => SetPages("2nd")} onClick={pageselect} onMouseUp={handleButtonClick} >
                    <a href="*" className="page-link" role="button" tabindex="0"> Page 2  </a>
                  </li>

                  <li className="page-item" onMouseDown={(e) => SetPages("3rd")} onClick={pageselect} onMouseUp={handleButtonClick} >
                    <a href="*" className="page-link" role="button" tabindex="0">  Page 3  </a>
                  </li>

                  <li className="page-item" onMouseDown={(e) => SetPages("4th")} onClick={pageselect} onMouseUp={handleButtonClick}>
                    <a href="*" className="page-link" role="button" tabindex="0">  Page 4  </a>
                  </li>

                  <li className="page-item" onMouseDown={(e) => SetPages("5th")} onClick={pageselect} onMouseUp={handleButtonClick} >
                    <a href="*" className="page-link" role="button" tabindex="0"> Page 5 </a>
                  </li>

                  <li className="page-item" onMouseDown={(e) => SetPages("Back")} onClick={pageselect} onMouseUp={handleButtonClick} >
                    <a href="*" className="page-link" role="button" tabindex="0"> Page 6 </a>
                  </li>

                  <li
                    className="page-item"
                    onMouseDown={(e) => SetPages("Front")}
                    onClick={pageselect}
                    onMouseUp={handleButtonClick}
                  >
                    <a  href="*" className="page-link" role="button" tabindex="0">
                      Page 7
                    </a>
                  </li>
                  <li
                    className="page-item"
                    onMouseDown={(e) => SetPages("Front")}
                    onClick={pageselect}
                    onMouseUp={handleButtonClick}
                  >
                    <a href="*" className="page-link" role="button" tabindex="0">
                      Page 8
                    </a>
                  </li>
                </ul>
              </div>

              <div className="newsview">
                <div className="grid-container">
                  <div className="left-half">
                    {getdata.map((item, index) => {
                      return (
                        <>
                          <ul>
                            <li onClick={(ev) => getid(item._id)}  key={index}
                              onMouseDown={() => handleidClick(index)}
                              style={{ border:selectedItem === index? "3px solid #005DA4": "none",
                              Color:selectedItem === index ? "yellow" : "white", }}>
                              <div className="sideHeading">
                                <div className="sideHeadingimage">
                                  <img src={"https://staticvk.hindutamil.in/vetrikkodi/Test/"+ item.Image}
                                    alt="" onError={handleImageError}> 
                                  </img>
                                </div>
                                <a> {item.head || item.head_kicker ||"**புகைப்பட செய்தி**"} </a>
                              </div>
                            </li>
                          </ul>
                        </>
                      );
                    })}
                  </div>

                  <div className="right-half">
                    <div className="newscontent">
                      {selectnews && selectnews.length > 0 ? (
                        selectnews.map((item, index) => {
                          return (
                            <div key={index}>
                              <div className="newsimage">
                                <Carousel
                                  variant="dark"
                                  interval={1500}
                                  indicators={false}
                                  controls={false}
                                >
                                  <Carousel.Item>
                                    <img src={"https://staticvk.hindutamil.in/vetrikkodi/Test/"+ item.Image}
                                      alt="no image found" onError={handleImageError} ></img>
                                    <h6>{item.cutline}</h6>
                                  </Carousel.Item>
                                  {item.Image1 && (
                                    <Carousel.Item>
                                      <img src={"https://staticvk.hindutamil.in/vetrikkodi/Test/"+ item.Image1}
                                        alt="no image found"  onError={handleImageError}></img>
                                      <h6>{item.cutline}</h6>
                                    </Carousel.Item>
                                  )}
                                </Carousel>
                              </div>

                              <h4>{item.head_kicker}</h4>

                              <h3>{item.head}</h3>
                              {item.head_deck ? (
                                <ul>
                                  {" "}
                                  <li>
                                    {" "}
                                    <h5>{item.head_deck}</h5>
                                  </li>{" "}
                                </ul>
                              ) : null}
                              <h5>{item.byline}</h5>
                              <h5 style={{ color: "green" }}>{item.factbox}</h5>

                              <div className="newsbody">
                                <h6>{item.dateline}</h6>
                                <p>{item.body}</p>
                                <p>{item.body1}</p>
                                <p>{item.body2}</p>
                                <p>{item.body3}</p>
                                <p>{item.body4}</p>
                                <p>{item.body5}</p>
                                <p>{item.body6}</p>
                                <p>{item.body7}</p>
                                <p>{item.body8}</p>
                                <p>{item.body9}</p>
                                <p>{item.body10}</p>
                                <p>{item.body11}</p>
                                <p>{item.body12}</p>
                                <p>{item.tagline_credit}</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div>
                          {postdata.length > 0 && (
                            <div>
                              <div className="newsimage">
                                <Carousel>
                                  <Carousel.Item>
                                  <img src={"https://staticvk.hindutamil.in/vetrikkodi/Test/"+ postdata[0].Image}
                                        alt="no image found" onError={handleImageError}></img>
                                    <h6>{postdata[0].cutline}</h6>
                                  </Carousel.Item>
                                  {postdata[0].Image1 && (
                                    <Carousel.Item>
                                      <img src={"https://staticvk.hindutamil.in/vetrikkodi/Test/"+ postdata[0].Image1}
                                        alt="no image found" onError={handleImageError}></img>
                                      <h6>{postdata[0].cutline}</h6>
                                    </Carousel.Item>
                                  )}
                                </Carousel>
                              </div>

                              <h4>{postdata[0].head_kicker}</h4>
                              {/* <h4>{postdata[0]._id}</h4> */}
                              <h3>{postdata[0].head}</h3>
                              {postdata[0].head_deck ? (
                                <ul>
                                  {" "}
                                  <li>
                                    {" "}
                                    <h5 style={{ color: "black" }}>
                                      {postdata[0].head_deck}
                                    </h5>
                                  </li>{" "}
                                </ul>
                              ) : null}
                              <h5>{postdata[0].byline}</h5>
                              <h5 style={{ color: "green" }}>
                                {postdata[0].factbox}
                              </h5>

                              <div className="newsbody">
                                <h6>{postdata[0].dateline}</h6>
                                <p>{postdata[0].body}</p>
                                <p>{postdata[0].body1}</p>
                                <p>{postdata[0].body2}</p>
                                <p>{postdata[0].body3}</p>
                                <p>{postdata[0].body4}</p>
                                <p>{postdata[0].body5}</p>
                                <p>{postdata[0].body6}</p>
                                <p>{postdata[0].body7}</p>
                                <p>{postdata[0].body8}</p>
                                <p>{postdata[0].body9}</p>
                                <p>{postdata[0].body10}</p>
                                <p>{postdata[0].body11}</p>
                                <p>{postdata[0].body12}</p>
                                <p>{postdata[0].tagline_credit}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="news-footer">
                      <div className="emoji">
                        <ul className="emoji1">
                          <li>
                            <button onClick={handleSpeakClick} disabled={isSpeaking}>
                              {isSpeaking ? ("Speaking...") : (<FontAwesomeIcon icon={faMicrophone} />)}
                            </button>{" "}
                            <button onClick={handleStopClick}>Stop</button>
                          </li>

                          <li>
                            <button onClick={handleLikeClick}> <FontAwesomeIcon icon={faThumbsUp} /> {likes} </button>
                          </li>

                          <li>
                            <button onClick={handledislike}> <FontAwesomeIcon icon={faThumbsDown} /> {dislike} </button>
                          </li>

                          {/* <li><button onClick={handleClick}>share</button></li> */}

                        </ul>
                        <ul className="emoji2">
                          <li>
                            <button onClick={shareclick}>
                              <FontAwesomeIcon icon={faShare} /> Share
                            </button>
                          </li>

                          <li>
                            <button onClick={clickcomment}>
                              <FontAwesomeIcon icon={faComment} />  Comments
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div >
                        {showCommentbox && (
                          <div className="commentboxview">
                            <li>
                              <form onSubmit={handleCommentSubmit}>
                                {" "}
                                <input type="text" name="commentInput" maxLength={60} placeholder="comment" />
                                <button type="submit">
                                  {" "}
                                  <span>Submit</span>{" "}
                                </button>
                              </form>
                              <li> {comments}</li>
                            </li>
                            <button onClick={closecomment}>Close</button>
                          </div>
                        )}
                      </div>

                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
      </div>

      <div>
        <br />
        <br />
        <br />
      </div>


      <div className="app-footer">
        <input type="date" value={selectdate.toISOString().substr(0, 10)}
          className="date-input" onChange={dateChange} />

        <button onClick={() => { fetchPdf();news()}}>Submit</button>

      </div>
    </>
  );
}
