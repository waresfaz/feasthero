import Item from "./Item"

export default function list() {

  const data = {
    content: [
      {
        title: 'Empanada Extravaganza',
        cost: 40,
        description: 'TESTING Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non laoreet ipsum, id rutrum dui. Donec pretium lacus libero, at pretium justo consectetur ornare. Integer at dolor nibh.'
      },
      {
        title: 'Pizza Palooza',
        cost: 45,
        description: 'TESTING 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non laoreet ipsum, id rutrum dui. Donec pretium lacus libero, at pretium justo consectetur ornare. Integer at dolor nibh.'
      }
    ]
  }

  const classesList = data.content.map(classes => {
    const title = classes.title;
    const cost = classes.cost;
    const description = classes.description;

    return (
      <Item 
        title = {title}
        cost = {cost}
        description = {description}
      />
    )
  });


  return (
    <body className="main">

      <div className="byline">
        <p>Cook together from anywhere</p>
      </div>

      <div>
        {classesList}
      </div>

    </body>
  );
}