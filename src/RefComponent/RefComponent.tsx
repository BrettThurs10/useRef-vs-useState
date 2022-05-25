import { useRef, useState, ChangeEvent, useEffect } from "react";
import { styles } from "./RefComponentStyles";
const RefComponent = () => {
  // we are making an abstract reference with dataref since it's not attached to a the "ref" attribute
  const dataRef = useRef("🥧");
  // we are making a direct reference to the 2nd input element below by attaching this const to it's "ref" attribute -> see below in render
  const inputRef = useRef<HTMLInputElement>(null);
  // we are making another abstract reference here to hold the count of how many times this component has rendered
  const timesRendered = useRef(0);
  // we are making a state variable here and assigning it's value to the 2nd input below. by doing this we will cause a re-render whenever we set it's value
  const [inputString, setInputString] = useState("🍕");

  // this function will update the dataRef const. notice how we are updating the "current" property on dataRef. also, notice how in console the component is NOT rendering when you type into the dataRef input
  const updateDataRef = (e: ChangeEvent<HTMLInputElement>) => {
    dataRef.current = e.target.value;
    console.log(dataRef.current);
  };

  // here we are making a method to update our state variable and assigning it to the "onChange" attribute on the inputString input
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputString(e.target.value);
  };
  // this method just logs the timesRendered and which useEffect block the render happened from
  const renderMsg = (fromWhere: string) => {
    console.log(
      `✨ Component has rendered ${timesRendered.current} times and most recently from ${fromWhere}`
    );
  };

  // a helper method to help with logging
  const whereFromMsg = (type: string, value: string) => {
    console.log(`${type} === ${value}`);
  };

  // a method to update our timesRendered ref
  const updateTimesRendered = () =>
    (timesRendered.current = timesRendered.current + 1);

  // method to focus the inputRef input element
  const handleOnClick = () => {
    inputRef?.current?.focus();
  };

  // let's log the first time this component actually renders. dev note: removing  <React.StrictMode> that wraps your <App /> by default with Create React app will make React components only render once. With strict mode enable they will render twice as of React 18.
  useEffect(() => {
    updateTimesRendered();
  }, []);

  // Whenever the dataRef is changed, let's log it
  useEffect(() => {
    updateTimesRendered();
    renderMsg("dataRef useEffect");
    whereFromMsg("dataRef", dataRef.current);
  }, [dataRef]);

  // Whenever the inputString is changed, let's log it
  useEffect(() => {
    updateTimesRendered();
    renderMsg("inputString useEffect");
    whereFromMsg("inputString", inputString);
    // uncomment to see how useRef can capture the previous state, but not current. i.e. typing in dog in the useState input you will see 'dog' and in the useRef value you will see 'do'
    // dataRef.current = inputString;
  }, [inputString]);

  return (
    <div style={styles.centerDiv}>
      <h1>useRef vs useState</h1>

      <div style={{ width: "300px", alignSelf: "center" }}>
        <p>
          Sometimes you want to capture data without causing a render of a
          component or components. Utilizing the useRef hook is a workaround for
          that. Check out the console in your browser via Inspect Element to see
          what's happening and when.
        </p>

        <p style={styles.label}>dataRef.current value:</p>
        <pre>{dataRef.current}</pre>
        <input
          placeholder="type something"
          onChange={updateDataRef}
          type="text"
          id="fname"
          name="fname"
        />

        <p style={styles.label}>inputString value:</p>
        <pre>{inputString}</pre>
        <input
          ref={inputRef}
          placeholder="type something"
          onChange={handleOnChange}
          type="text"
          id="fname"
          name="fname"
        />

        <div style={{ paddingBottom: "20px" }} />

        <button onClick={handleOnClick}>Focus inputRef</button>
      </div>
    </div>
  );
};

export default RefComponent;
