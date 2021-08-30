const { supabase } = require("../../utils/database");
const querystring = require("querystring");

const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = querystring.parse(event.body);
  const { firstname, lastname, country } = params;

  const userData = {
    firstname,
    lastname,
    country,
  };

  try {
    // Add user to Supabase Database
    const { data, error } = await supabase
      .from("users")
      .insert([{ user: userData }]);
    console.log(data, error);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
