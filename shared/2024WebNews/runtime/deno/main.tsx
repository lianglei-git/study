import express from "npm:express@4";
import dir from "https://deno.land/x/dir/mod.ts";
import React from "npm:react";
import ReactDom,{renderToString} from "npm:react-dom/server";
const homeDirectory = dir("home");
export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}

const Component = (props) => {
  console.log(props);
  const onClick = () => {
    console.log(999);
  };
  return (
    <div>
      <h2>{props.value}</h2>

      <button onClick={onClick}>++</button>
    </div>
  );
};

console.log(homeDirectory, ReactDom);

const app = express();

app.get("/", function (_req, res) {
  res.send(<Component value={10000} />);
  res.send(renderToString(<Component value={10000} />));
  
  // res.send(homeDirectory)
  // res.send(renderToString(<Component value={10000} />));
  // console.log(ReactDom.renderToPipeableStream,"ReactDom")
  // const { pipe } = ReactDom.renderToPipeableStream(<Component value={10000} />,{
  //   bootstrapScripts: ['/main.js'],
  //   onShellReady() {
  //     res.setHeader('content-type', 'text/html');
  //     pipe(res);
  //   }
  // });
});

app.listen(3000, () => {
  console.log("Express listening on http://localhost:3000");
});

/**
 * deno run --allow-net --allow-read --allow-env main.tsx
 */
