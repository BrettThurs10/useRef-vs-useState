import { useRef, useState, ChangeEvent, useEffect } from "react";
import { styles } from "./RefComponentStyles";
const RefComponent = () => {
  const inputRef = useRef("🥧");
  const [inputString, setInputString] = useState("🍕");
  let [timesRendered, setTimesRendered] = useState(0);

  const updateRef = (e: ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.target.value;
    console.log(inputRef.current);
    //look at your console and notice how the component is NOT rendering when you type into the useRef input
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputString(e.target.value);
  };
  const renderMsg = (fromWhere: string) => {
    console.log("✨ Component rendered because of " + fromWhere);
  };
  const whereFromMsg = (type: string, value: string) => {
    console.log(`${type} === ${value}`);
  };

  const updateTimesRendered = () => setTimesRendered(timesRendered + 1);
  const renderTimesRendered = () => timesRendered;

  useEffect(() => {
    updateTimesRendered();
  }, []);

  useEffect(() => {
    updateTimesRendered();
    renderMsg("inputRef useEffect");
    whereFromMsg("inputRef", inputRef.current);
  }, [inputRef]);

  useEffect(() => {
    updateTimesRendered();
    renderMsg("inputString useEffect");
    whereFromMsg("inputString", inputString);
    // uncomment to see how useRef can capture the previous state, but not current. i.e. typing in dog in the useState input you will see 'dog' and in the useRef value you will see 'do'
    // inputRef.current = inputString;
  }, [inputString]);

  return (
    <div style={styles.centerDiv}>
      <h1>useRef vs useState</h1>

      <div style={{ width: "300px", alignSelf: "center" }}>
        <p>
          Sometimes you want to capture data without causing a render of a
          component or components. useRef is a workaround for that. Check out
          the console in your browser via Inspect Element to see what's
          happening and when.
        </p>
        <p style={styles.label}>useRef value:</p>
        <pre>{inputRef.current}</pre>
        <input
          placeholder="type something"
          onChange={updateRef}
          type="text"
          id="fname"
          name="fname"
        />
        <p style={styles.label}>useState value:</p>
        <pre>{inputString}</pre>
        <input
          placeholder="type something"
          onChange={handleOnChange}
          type="text"
          id="fname"
          name="fname"
        />

        <p style={styles.label}>component has rendered:</p>
        <pre>{`${renderTimesRendered()} ${
          timesRendered > 1 ? "times" : "time"
        }`}</pre>
      </div>
    </div>
  );
};

export default RefComponent;
