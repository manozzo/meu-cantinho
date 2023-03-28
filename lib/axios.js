import axios from "axios";

async function getTwitchAuthorization() {
  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_TWITCH_SECRET}&grant_type=client_credentials`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getStreams(userLogins) {
  const first = 10;
  const userLoginParam = "&user_login=" + userLogins;

  const endpoint = `https://api.twitch.tv/helix/streams?first=${first}${
    userLogins ? userLoginParam : ""
  }`;

  let authorizationObject = await getTwitchAuthorization();
  let { access_token, expires_in, token_type } = authorizationObject;

  //token_type first letter must be uppercase
  token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

  let authorization = `${token_type} ${access_token}`;

  let headers = {
    authorization,
    "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
  };

  try {
    const response = await axios.get(endpoint, { headers });
    // console.log(response.data.data);
    return response;
  } catch (error) {
    console.log(error);
  }
}
