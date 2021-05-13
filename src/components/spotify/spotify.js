// Not a component

// TODO :- move out of component folder after completion

// when user click on login button,
// redirect to spotify login page
export const authEndpoint = "https://accounts.spotify.com/authorize";

// once spotify verifies the login
// it will redirect you to back to your App Url
const redirectUri = "https://zepmk.csb.app/";

// client ID from spotify
const clientId = "01a991f53fce4669b2a1626c53b7b1db";

// once you are logged in the app
// will have all these things listed out
// giving user the scope to perform crud like functionalities in app
// it will get you permission to play music etc..
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state"
];

export const LOGIN_URL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
