import Item from "./Item"
// list() returns the list of classes offered by feasthero
export default function list() {
  // hardcorded data -- each object contains info about a given cooking class and an the chef running the class.
  const data = {
    content: [
      {
        title: 'Empanada Extravaganza',
        cost: 40,
        thumbnail: 'images/empanadas.png',
        description: 'TESTING Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non laoreet ipsum, id rutrum dui. Donec pretium lacus libero, at pretium justo consectetur ornare. Integer at dolor nibh.',
        duration: 2,
        chef: {
          name: 'Wares Fazelyar',
          photo: 'images/wares.png',
          bio: "Wares' expertise as a chef draw from his extensive experience in the consumption sector. He has over 25 years of first hand experience in gustation processing and is excited to share his knowledge with you!"
        },
        // datetime : {
        //   date: ['Tuesday, January, 5, 2020', '10am', '4pm'], 'Tuesday, January, 12, 2020', 'Tuesday, January, 19, 2020', 'Tuesday, January, 5, 2020']
        // }
        schedule: [
          {
            date: 'Tuesday, January 5, 2020',
            time: ['10am', '4pm']
          },
          {
            date: 'Thursday, January 7, 2020',
            time: ['4pm']
          },
          {
            date: 'Tuesday, January 12, 2020',
            time: ['10am', '4pm']
          },
          {
            date: 'Thursday, January 14, 2020',
            time: ['4pm']
          },
          {
            date: 'Tuesday, January 19, 2020',
            time: ['10am', '4pm']
          },
          {
            date: 'Thursday, January 21, 2020',
            time: ['4pm']
          }
        ],
      },
      {
        title: 'Pizza Palooza',
        cost: 45,
        thumbnail: 'images/pizza.png',
        description: 'TESTING 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non laoreet ipsum, id rutrum dui. Donec pretium lacus libero, at pretium justo consectetur ornare. Integer at dolor nibh.',
        duration: 1.5,
        chef: {
          name: 'Nazir Amir',
          photo: 'images/nazir.png',
          bio: "Nazir has spent over a decade crafting culinary experiences for groups ranging from 2 - 150. He studied at the famous Toronto based Faculty of Culinary Creation. He was awarded with the coveted Taste Trophy in 2019, reocngizing him for his top notch ability to craft tasty dishes for all sorts."
        },
        schedule: [
          {
            date: 'Monday, January 4, 2020',
            time: ['12pm', '4pm']
          },
          {
            date: 'Wednesday, January 6, 2020',
            time: ['1pm', '4pm']
          },
          {
            date: 'Monday, January 11, 2020',
            time: ['12pm', '4pm']
          },
          {
            date: 'Wednesday, January 13, 2020',
            time: ['1pm', '4pm']
          },
          {
            date: 'Monday, January 18, 2020',
            time: ['12pm', '4pm']
          },
          {
            date: 'Wednesday, January 20, 2020',
            time: ['4pm']
          }
        ],
      }
    ]
  }

  // this function loops over the hardcoded data returns an Item component for each class that's offered
  const classesList = data.content.map(classes => {
    const title = classes.title;
    const thumbnail = classes.thumbnail;
    const cost = classes.cost;
    const description = classes.description;
    const duration = classes.duration;
    const chef = classes.chef;
    const schedule = classes.schedule

    // console.log('here is tehd atteime', schedule)


    return (
      <Item
        title={title}
        thumbnail={thumbnail}
        cost={cost}
        description={description}
        duration={duration}
        chef={chef}
        schedule={schedule}
      />
    )
  });


  return (
    <body className="main">
      <h1 style={{marginBottom: "12%"}} >How it works</h1>
      <section className="instructions">
        <div className="instruction--card">
          <img
            className="instruction--card-icon"
            src="images/card-select.svg"
            alt=""
          />
          <h3>Select a class</h3>
        </div>
        <div className="instruction--card">
          <img
            className="instruction--card-icon"
            src="images/card-list.svg"
            alt=""
          />
          <h3>Enter booking details</h3>
        </div>
        <div className="instruction--card">
          <img
            className="instruction--card-icon"
            src="images/card-pay.svg"
            alt=""
          />
          <h3>Review and Pay</h3>
        </div>
      </section>

      <h1>Select a class</h1>

      <div>
        {classesList} {/* curly braces used to render the classesList function from above which renders each class as an 'Item' component */}
      </div>

    </body>
  );
}