// CSS Import
import 'bootstrap/dist/css/bootstrap.css'

const Sidebar = () => {

    return (<div>
        <button data-bs-toggle="collapse" data-bs-target="#sidebar" aria-expanded="false" aria-controls="sidebar">Classes</button>

        <div className="collapse collapse-horizontal" id="sidebar">
            <div className="card card-body" style={{width: 300 + "px", height: 100 + "vw", zIndex: 1000}}>
            This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
            </div>
        </div>
    </div>)
}

export default Sidebar;