import CustomNode from "./CustomNode";
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DEFAULT_CLASSES = [
    ["ANTH 1", 4.0], ["ANTH 2", 4.0], ["ANTH 3", 4.0],
    ["CSE 11", 4.0], ["CSE 12", 4.0], ["CSE 20", 4.0],
    ["CSE 21", 4.0], ["CSE 29", 4.0], ["CSE 30", 4.0],
    ["CSE 100", 4.0], ["CSE 101", 4.0], ["CSE 110", 4.0],
    ["HUM 1", 4.0], ["HUM 2", 4.0], ["HUM 3", 4.0],
    ["HUM 4", 4.0], ["HUM 5", 4.0]
];

const RenderNodes = (props) => {
    const [classes, setClasses] = useState(DEFAULT_CLASSES);
    const [loading, setLoading] = useState(true); // Optional: Handle loading state

    const loadClasses = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/update/load-courses`);
            const data = await response.json();

            if (data.length === 0) {
                setClasses(DEFAULT_CLASSES);
            } else {
                const class_list = data.map(course => [`${course.department} ${course.number}`, course.units]);
                setClasses(class_list);
            }
        } catch (error) {
            console.error(`Error while loading classes: ${error}`);
        } finally {
            setLoading(false); // Ensure loading state is turned off
        }
    };

    // Load classes before rendering anything
    useEffect(() => {
        loadClasses();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Optional: Show a loading message
    }

    let search = props.search;
    let render = search
        ? classes.filter(course => course[0].includes(search))
        : classes;

    return render.map((course, i) => (
        <CustomNode label={course[0]} units={course[1]} key={`${course}-${i}`} />
    ));
};

export default RenderNodes;
