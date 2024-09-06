import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Component Imports
import UploadTranscriptModal from './UploadTranscriptModal';


const ActionTab = () => {
    return (
        <div>
            <div className="dropdown show">
                <a className="btn btn-primary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Actions
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" 
                        data-bs-toggle="modal" 
                        data-vs-target="#AddClasses">Add Class
                    </a>
                    <a className="dropdown-item" 
                        data-bs-toggle="modal" 
                        data-vs-target="#AddClasses">Import Plan
                    </a>
                    <a className="dropdown-item" 
                        data-bs-toggle="modal" 
                        data-vs-target="#AddClasses">Export Plan
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" 
                        data-bs-toggle="modal" 
                        data-bs-target="#UploadTranscript">Upload Transcript
                    </a>
                </div>
            </div>
            
            <UploadTranscriptModal modalId="UploadTranscript" title={"Upload Transcript"}>
            </UploadTranscriptModal>
        </div>
    );
};

export default ActionTab;