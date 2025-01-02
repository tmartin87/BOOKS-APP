import "./BackToTop.css"
import top from "../assets/top.svg";

function BackToTop(){
    return (
      <button
        className="top-button"
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      >
        {" "}
        <img className="top-icon" src={top} />
      </button>
    );
}

export default BackToTop;