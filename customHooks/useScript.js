import React from "react";

export const ScriptStatus = Object.freeze({
  Idle: "IDLE",
  Error: "ERROR",
  Loading: "LOADING",
  Success: "SUCCESS",
});

const useScript = (url, id) => {
  const [state, setState] = React.useState(ScriptStatus.Idle);

  React.useEffect(() => {
    if (typeof document === "undefined") {
      setState(ScriptStatus.Error);

      return () => {};
    }

    const existingScript = document.getElementById(id);
    if (existingScript) {
      setState(ScriptStatus.Success);

      return () => {};
    }

    setState(ScriptStatus.Loading);

    const script = document.createElement("script");
    script.id = id;
    script.src = url;
    script.async = true;

    const onScriptLoad = () => {
      setState(ScriptStatus.Success);
    };

    const onScriptError = () => {
      script.remove();

      setState(ScriptStatus.Error);
    };

    script.addEventListener("load", onScriptLoad);
    script.addEventListener("error", onScriptError);

    // Add script to the document head
    document.head.appendChild(script);

    // Remove event listeners on cleanup
    return () => {
      script.removeEventListener("load", onScriptLoad);
      script.removeEventListener("error", onScriptError);
    };
  }, [url, id]);

  return state;
};

export default useScript;