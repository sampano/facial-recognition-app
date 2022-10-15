import "./face-recognition.css";
const FaceRecognition = ({ searchField, box }) => {
  //console.log("faceRecognityio", searchField);
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          alt=""
          src={searchField}
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box "
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
