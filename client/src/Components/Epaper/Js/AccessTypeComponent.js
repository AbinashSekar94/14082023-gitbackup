import React, { useEffect, useState } from "react";
import { enc, HmacSHA256 } from "crypto-js";

const AccessTypeComponent = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  // Function to generate the Authorized User JWT
  const generateJWT = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const payload = {
      email: userData.user.email,
      id: userData.user.id,
    };

    const secret = "dA5g32X99qnRMsmmJzjNqaKV";

    const encodedHeaders = enc.Base64.stringify(
      enc.Utf8.parse(JSON.stringify(header))
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const encodedPayload = enc.Base64.stringify(
      enc.Utf8.parse(JSON.stringify(payload))
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Generating the HMAC SHA256 signature using the secret
    const signature = HmacSHA256(`${encodedHeaders}.${encodedPayload}`, secret);

    // Encoding the signature as a Base64 string without padding
    const encodedSignature = enc.Base64.stringify(signature)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Constructing the JWT token
    const jwtToken = `${encodedHeaders}.${encodedPayload}.${encodedSignature}`;

    return jwtToken;
  };

  useEffect(() => {
    // Function to fetch subscriptions
    const fetchSubscriptions = async () => {
      const accesstypeJwt = generateJWT();

      // Set the user context using AccessTypeJS
      window.AccessType.setUser({
        accesstypeJwt: accesstypeJwt,
      })
        .then(() => {
          // Call the getSubscriptions method from AccessTypeJS
          window.AccessType.getSubscriptions()
            .then((data) => {
              setSubscriptions(data.subscriptions);
              console.log(data.subscriptions[0], "this is subscription");

              if (data.subscriptions[0].active === true) {
                console.log("already subscribed");
              } else {
                window.location.href =
                  "https://news.vetrikkodi.hindutamil.in/subscription";
              }
            })
            .catch((error) => {
              console.error("Error fetching subscriptions:", error);
            });
        })
        .catch((error) => {
          console.error("Error setting user context:", error);
        });
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      <h1>Subscriptions</h1>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.id}>{subscription.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AccessTypeComponent;

