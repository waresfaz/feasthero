import Item from "./Item"

export default function list() {

  const data = [
    {
      title: 'Qabuli Palaw Palooza',
      cost: 45,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non laoreet ipsum, id rutrum dui. Donec pretium lacus libero, at pretium justo consectetur ornare. Integer at dolor nibh.'
    },
    {
      title: 'Empanada Extravaganza',
      cost: 40,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non laoreet ipsum, id rutrum dui. Donec pretium lacus libero, at pretium justo consectetur ornare. Integer at dolor nibh.'
    }
  ]

  function getTitle(arr) {
    let result = '';
    for (let i = 0; i < arr.length; i++) {
      result += arr[i].title
    }
    return result;
  }

  console.log(getTitle(data))

  return (
    <body className="main">

      <div className="byline">
        <p>Cook together from anywhere</p>
      </div>

      <div>
        <Item />
      </div>

    </body>
  );
}