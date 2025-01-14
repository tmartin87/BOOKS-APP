import "./ErrorMessage.css"
import { useEffect, useRef } from "react";

function ErrorMessage({error}){
    const initialReloadCount = window.localStorage.getItem('reloadCount');
    let reloadCount = useRef(initialReloadCount);
    
    useEffect(()=>{
        window.localStorage.setItem('reloadCount', reloadCount.current); //CHECK
        return () => window.localStorage.removeItem('reloadCount');
        // Interesante forma de gestionar la impaciencia del usuario 😅
    },[])

    return (
      <div className="ErrorMessage">
        {reloadCount.current < 3 && <p>{error}</p>}
        {reloadCount.current < 3 && (
          <button
            className="ErrorMessage-refresh-button"
            onClick={() => {
              window.location.reload();
              reloadCount.current++;
               window.localStorage.setItem(
                 "reloadCount",
                 reloadCount.current
               );
            }}
          >
            🔃
          </button>
        )}
        {reloadCount.current >= 3 && (
          <p>Ooops! It looks like a reload cannot fix this 😟</p>
        )}
      </div>
    );

}

export default ErrorMessage;