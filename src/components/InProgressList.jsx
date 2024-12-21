import { useState } from "react";
import "./InProgressList.css"
function InProgressList(){
    const [booksInProgress, setBooksInProgress] = useState([]);
    return(
    <div>
        <h2>In progress</h2>
        <ul>
        </ul>
    </div>
    )
}
export default InProgressList;