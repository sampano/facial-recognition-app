import { useState } from "react";
import FaceRecognition from "./components/face-recognition/face-recognition";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/image-link-form/image-link-form";
import Rank from "./components/rank/rank";
import ParticlesBg from "particles-bg";
import "./App.css";

function App() {
  let input = "";
  let box = {};
  const [searchField, setSearchField] = useState(input);
  const [boxSize, setBoxSize] = useState(box);

  const onInputChange = (event) => {
    input = event.target.value;
  };

  const onButtonSubmit = () => {
    setSearchField(input);
    clarifai(searchField);
  };

  const clarifai = async (searchField) => {
    const USER_ID = "sampan0";
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "43fd8b37c5a54af38e9b587045c354e1";
    const APP_ID = "my-first-application";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
    const IMAGE_URL = searchField;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
    const response = await fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => displayFaceBox(calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBoxSize(box);
    console.log(boxSize);
  };

  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <ParticlesBg type="cobweb" bg={true} />
      <FaceRecognition box={boxSize} searchField={searchField} />
    </div>
  );
}

export default App;
