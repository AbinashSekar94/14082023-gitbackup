import { useState, useEffect } from "react";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { Container } from "react-bootstrap";
// import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../Styles/sharearticle.css";
import Logo from "../Assest/logo.png";
import axios from "axios";
// import '../Styles/sidebar.css';
import { useParams } from "react-router-dom";

export default function Sidebar() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log(data);
  console.log(id);

  useEffect(() => {
    const getid = async () => {
      await axios
        .post(`${process.env.REACT_APP_IPCONFIG}news/id`, { id: id })
        .then((res) => {
          setData(res.data.response);
        });
    };
    getid();
  }, []);

  //alterante images
  // const [imageUrl, setImageUrl] = useState(require('../Assest/logo.png'));

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = process.env.PUBLIC_URL + "/news/logo.png";
  };

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(document.getElementById("download"));
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "Vk_news.png", "image/png");
  };

  const shareOnWhatsapp = () => {
    const imageUrl = `http://localhost:3000/share/${id}`; // Replace with your image URL
    const encodedUrl = encodeURIComponent(imageUrl);
    window.open(`https://api.whatsapp.com/send?text=${encodedUrl}`, "_blank");
  };

  return (
    <div className="sharing">
      <div className="social-media-icons">
        <div onClick={handleCaptureClick}>
          <FontAwesomeIcon icon={faDownload} />
        </div>
        <div><a href="https://www.facebook.com/TamilTheHindu/" target={"blank"}>
          <FontAwesomeIcon icon={faFacebook} />
        </a></div>
        <div target={"blank"} onClick={shareOnWhatsapp}>
          <FontAwesomeIcon icon={faWhatsapp} />
        </div>
        <div><a href="https://twitter.com/TamilTheHindu" target={"blank"}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        </div>
        <div><a href="https://www.instagram.com/hindu_tamil/" target={"blank"}>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        </div>
      </div>
      <Container>
        <div className="sharebody" id="download">
          <div id="download">
            <div className="vklogo">
              <img src={Logo} alt=""></img>
            </div>

            <div className="shareContent">
              {data.map((item, index) => (
                <div key={index}>
                  <h5>
                    {item.Date} {item.Pagename}Page
                  </h5>
                 
                  <h4>{item.head_kicker}</h4>
                  <h2>{item.head}</h2>
                  
                 <br />
                  <h5>{item.head_deck}</h5>
                  <h5>{item.byline}</h5>
                  <h5>{item.dateline}</h5>
                  <br />
                  <img
                    src={process.env.PUBLIC_URL + "/news/" + item.Image}
                    alt=""
                    onError={handleImageError}
                  ></img>
                   <h5>{item.cutline}</h5>
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
              ))}
            </div>

            <div className="footer">
              <div className="add">
                <h1>Advertisement</h1>
              </div>

              <div className="addcontent">
                <h1>Content</h1>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
