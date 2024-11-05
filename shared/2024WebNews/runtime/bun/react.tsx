/**
 * Run it:
 * bun install react
 * bun build react.tsx >react-bundle.js
 */

function Component(props: { message: string }) {
  return (
    <body>
      <h1 style={{ color: "red" }}>{props.message}</h1>
    </body>
  );
}

console.log(<Component message="Hello world!" />);
