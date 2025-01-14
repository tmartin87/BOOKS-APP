import "./AllBooksPage.css"
import AllBooksList from "../components/AllBooksList";

function AllBooksPage(){

    return(
        <>
            <AllBooksList />
        </>
    )
}

// El componente AllBooksList se usa solamente aquí. ¿Es necesario crear un componente para ello? Si en un futuro necesitamos reutilizarlo en otro lugar lo veo coherente, pero dado que no es el caso, ¿no sería mejor incluirlo directamente en AllBooksPage.jsx?

export default AllBooksPage;