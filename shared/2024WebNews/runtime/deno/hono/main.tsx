import { Hono,jsx } from 'hono'
const app = new Hono();

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


app.get("/", (c) => {
  return c.html(
   <Component value={999}/>
  );
});
Deno.serve(app.fetch)
