import ReactDOM from 'react-dom/client'
import {Welcome} from "./components/Welcome";
import  './css/index.css'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Welcome />
    </BrowserRouter>
)
