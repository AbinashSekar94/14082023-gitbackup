import React from "react";
import "./../Css/Contactus.css";
import { Helmet } from "react-helmet";

export default function Contactus() {
  return (
    <div className="contactus_main">
      <Helmet>
        <title>Contact us - VETRIKKODI</title>

        <meta
          name="description"
          content="A place where academic excellence meets holistic growth. Attend varity of quizzes and get reward, Stay updated about your exams, Model question papers for board exams, Effective preparation techniques for exams "
        />

        <meta
          name="keywords"
          content="vetrikkodi contact, vetrikodi contact, vetrikkodi address, vetrikodi phone number, vetrikkodi contact number, epaper contact number, vetrikkodi advertisment number, contact information, get in touch, reach out, contact details, contact form, customer support, contact email, contact phone number"
        />
      </Helmet>

      <div className="contactus_div">
        <h2>CONTACT US</h2>

        <h4>ADDRESS</h4>
        <p>KSL MEDIA LIMITED, Kasturi Centre,</p>
        <p>124, Wallajah Road, Chennai - 600 002</p>

        <h4>PHONE</h4>
        <p>91 + 44 - 35048001</p>

        <h4>EMAIL</h4>
        <p>
          Advertisements Queries (Online):{" "}
          <a href="mailto:digitalads@hindutamil.co.in">
            digitalads@hindutamil.co.in
          </a>
        </p>
        <p>
          Print Subscription Queries (Paper & Magazine):{" "}
          <a href="mailto:circ@hindutamil.co.in">circ@hindutamil.co.in</a>
        </p>
        <p>
          Advertisements Queries (Print):{" "}
          <a href="mailto:tamilads@hindutamil.co.in">
            tamilads@hindutamil.co.in
          </a>
        </p>
        <p>
          Digital Subscription Queries (E-Paper & E-Magazine):{" "}
          <a href="mailto:epapercare@thehindu.co.in">
            epapercare@thehindu.co.in
          </a>{" "}
          /{" "}
          <a href="mailto:customercare@thehindu.co.in">
            customercare@thehindu.co.in
          </a>
        </p>
        <p>
          Subscription complaints (Print & Digital):{" "}
          <a href="mailto:customercare@thehindu.co.in">
            customercare@thehindu.co.in
          </a>
        </p>
        <p>
          Comments on the website:{" "}
          <a href="mailto:readers@hindutamil.co.in">readers@hindutamil.co.in</a>
        </p>

        <h4>CUSTOMER CARE</h4>
        <p>1800 102 1878</p>

        <h4>Grievance Redressal Officer (in India):</h4>
        <p>Susithra Maheswaran, Chief Sub Editor - Online Desk</p>
        <p>KSL MEDIA LIMITED,</p>
        <p>
          Email:{" "}
          <a href="mailto:vetrikodi@hindutamil.co.in">
            vetrikodi@hindutamil.co.in
          </a>
        </p>
      </div>
    </div>
  );
}
