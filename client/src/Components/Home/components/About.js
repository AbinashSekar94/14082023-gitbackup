import React from "react";
import { Container } from "react-bootstrap";
import "../About.css";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Vetrikkodi </title>
        <meta
          name="description"
          content="A place where academic excellence meets holistic growth. Attend varity of quizzes and get reward, Stay updated about your exams, Model question papers for board exams, Effective preparation techniques for exams "
        />

        <meta
          name="keywords"
          content="vetrikkodi, vetrikodi phone number, vetrikkodi about us, vetrikkodi advertisment number"
        />
      </Helmet>
      <Container>
        <div className="about_heading">
          <h4>ABOUT US</h4>
          <div className="about_content">
            <p>
              KSL Media Limited, a part of The Hindu Group, publishes Hindu
              Tamil Thisai, the Tamil language newspaper, in the state of Tamil
              Nadu. It was launched on 16th September 2013. The launch of Hindu
              Tamil Thisai is an important milestone as it signifies the Group's
              foray into the regional market for the first time in its history
              of 135 years.
            </p>
            <p>
              Hindu Tamil Thisai stands differentiated from the rest of the
              language dailies in Tamil Nadu through its unbiased news coverage,
              in-depth analysis of international, national and local issues in
              its edit pages, sections devoted for Business, Personal Finance,
              Education & Career, Infotainment for Kids, Spiritual Wellness,
              Cinema, Health, Agriculture, Environment and a dedicated section
              for its women readers .
            </p>
            <p>
              A special Tamil daily – “Vetri Kodi” was launched for School
              Students on October 2019.
            </p>
            <p>
              Hindu Tamil Thisai is the only daily from TN to deliver
              communication solutions to brands of clients, for their specific
              needs. Hindu Tamil Thisai ideates & executes both On Ground and
              Online activities for Brand launches, CSR initiatives of the
              clients, Customer Outreach programs in domains like Education &
              Career Counselling, Women Empowerment, Knowledge Enrichment for
              Kids through Quiz, Arts, Fun with Science and Social Awareness.
            </p>
            <p>
              Hindu Tamil Thisai is the only Language daily across the country
              to receive an Award from the Election Commission of India, for
              carrying out a Voter Awareness Program in the state of TN, during
              the General Elections held in 2019. The award was presented by the
              President of India to our publication on the 25th January 2020.
            </p>
            <p>
              Hindu Tamil Thisai has also won WAN-IFRA South Asian Digital Media
              Awards 2016 under “Reader Engagement Category” for the reader
              awareness program ideated and executed by it during the assembly
              elections in 2016.
            </p>
            <p>
              Hindu-Tamil Thisai is printed in six centres including the Main
              Edition at Chennai (Madras) where the Corporate Office is based.
              The printing centres are at Chennai, Coimbatore, Madurai,
              Tiruchirappalli, Thiruvananthapuram and Bengaluru.
            </p>
          </div>
          <h6>
            Hindu Tamil brings out special sections and features as follows:
          </h6>
          <h6>Vaniga Veedhi</h6>
          <h6>Vagana Ullagam</h6>
          <h6>Ilamai Pudhumai</h6>
          <h6>Uyir Moochu</h6>
          <h6>Maaya Bazaar</h6>
          <h6>Anandha Jyothi</h6>
          <h6>Hindu Talkies</h6>
          <h6>Sondha Veedu</h6>
          <h6>Nalamai Vazha</h6>
          <h6>Pen Indru</h6>
          <h6>Kamadenu – Weekly Digital Magazine</h6>
        </div>
      </Container>
    </>
  );
}
