import Item from "./Item"

export default function list() {

  const data = {
    content: [
      {
        title: 'Empanada Extravaganza',
        cost: 40,
        description: 'TESTING Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non laoreet ipsum, id rutrum dui. Donec pretium lacus libero, at pretium justo consectetur ornare. Integer at dolor nibh.',
        duration: 2,
        chef: {
          name: 'Wares Fazelyar',
          photo: null,
          bio: "Wares' expertise as a chef draw from his extensive experience in the consumption sector. He has over 25 years of first hand experience in gustation processing and is excited to share his knowledge with you!"
        }
        
        

      },
      {
        title: 'Pizza Palooza',
        cost: 45,
        description: 'TESTING 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non laoreet ipsum, id rutrum dui. Donec pretium lacus libero, at pretium justo consectetur ornare. Integer at dolor nibh.',
        duration: 1,
        chef: {
          name: 'Nazir Amir',
          photo: null,
          bio: "Nazir has spent over a decade crafting culinary experiences for groups ranging from 2 - 150. He studied at the famous Toronto based Faculty of Culinary Creation. He was awarded with the coveted Taste Trophy in 2019, reocngizing him for his top notch ability to craft tasty dishes for all sorts."
        }
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