import { useState } from "react";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/image-link-form/image-link-form";
import Rank from "./components/rank/rank";
import ParticlesBg from "particles-bg";
import "./App.css";

function App() {
  const [searchField, setSearchField] = useState("");

  const onInputChange = (event) => {
    console.log(event.target.value);
    //const searchFieldString = event.target.value();
    //setSearchField(searchFieldString);
  };

  const onButtonSubmit = () => {
    console.log("click");
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
    </div>
  );
}

export default App;
