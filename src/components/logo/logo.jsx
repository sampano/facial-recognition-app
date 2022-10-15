import "./logo.css";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Logo = () => {
  return (
    <Tilt>
      <div
        className="tilt ma4 mt0"
        style={{
          height: "150px",
          width: "150px",
        }}
      >
        <img src={brain} alt="logo"></img>
      </div>
    </Tilt>
  );
};

export default Logo;
