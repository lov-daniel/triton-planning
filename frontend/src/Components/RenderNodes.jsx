import CustomNode from "./CustomNode";


const RenderNodes = (props) => {

    let classes = ["ANTH 1", "ANTH 2", "ANTH 3",
                    "CSE 11", "CSE 12", "CSE 20",
                    "CSE 21", "CSE 29", "CSE 30",
                    "HUM 1", "HUM 2", "HUM 3"];

    let search = props.search
    let render = [];

    if (search) {
        classes.forEach((element) => {
            if (element.includes(search)) {
                render.push(element)
            }
        });
    } else {
        render = classes;
    }

    return render.map((course, i) => (
        <CustomNode label={course} units="4.0" key={`${course}-${i}`}/>
      ));
}; 

export default RenderNodes;