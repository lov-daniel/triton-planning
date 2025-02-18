import { useState } from 'react';

// CSS Import
import 'bootstrap/dist/css/bootstrap.css'
import './ComponentStyles/Sidebar.css'

// Component Import
import RenderNodes from './RenderNodes';

const Sidebar = () => {

    const [search, searchChange] = useState("");

    const onChange = (event) => {
        searchChange((event.target.value).toUpperCase())
        console.log("Search term:"+ search);
    }

    return (<div className="Sidebar">
        <div className="card card-body" style={{width: 500 + "px", height: 100 + "vw"}}>
            <div className="search-bar">
                <input className="form-control form-control-lg" 
                    type="text" 
                    placeholder="Search for class.." 
                    aria-label=".form-control-lg example" 
                    onChange={onChange}/>
            </div>
            <div className="container-grid">
                <RenderNodes search={search}/>
            </div>
        </div>
    </div>)
}

export default Sidebar;