// React Imports
import React, { useState } from "react";

const FileInput = () => {

    const [file, setFile] = useState(null);
    const [isUploaded, setUploaded] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploaded(true);
    };

    const handleSubmit = async (e) => {

        // Removes default function of submit button
        e.preventDefault();

        // Checks for empty submission
        if (!file) {
            return;
        }

        // Creates form data to send
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            }).then(console.log("data sent"));

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const LoadButton = () => {

        if (isUploaded) {
            return (<button type="submit">
                Upload File
            </button>)
        }

        return;
    }

    return (
        <div className="inputArea" method="post" onSubmit={handleSubmit}>
            <form>
                <input type="file" id="ifile" accept=".pdf" onChange={handleFileChange}></input>
                <LoadButton></LoadButton>
            </form>
        </div>
    )
}

export default FileInput;