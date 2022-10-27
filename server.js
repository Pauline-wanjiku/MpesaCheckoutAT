const express = require("express");
const app = express();

const port = 3001;
app.use(express.json());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Post
app.post("/:number/:amt", (req, res) => {
  const { number, amt } = req.params;

  const credentials = {
    apiKey: "23dd7d611493e910aa55d6e25e46e4693ddfb2a69f13ae7e479e9e1ad7dad785",
    username: "Sandbox",
  };

  // Initialize the SDK
  const AfricasTalking = require("africastalking")(credentials);

  // Get the payments service
  const payments = AfricasTalking.PAYMENTS;

  async function initiateMobileCheckout() {
    const options = {
      // Set the name of your Africa's Talking payment product
      productName: "fertilizer subsidy",
      // Set the phone number you want to send to in international format
      phoneNumber: `${number}`,
      // Set the 3-Letter ISO currency code and the checkout amount
      currencyCode: "KES",
      amount: `${amt}`,
    //   // Set any metadata that you would like to send along with this request.
    //   // This metadata will be included when we send back the final payment notification
    //   metadata: {
    //     foo: "bar",
    //     key: "value",
    //   },
    };

    // That's it hit send and we'll take care of the rest
    try {
      const result = await payments.mobileCheckout(options);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  initiateMobileCheckout();
});

// Set your app credentials
