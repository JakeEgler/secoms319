var books = [
  {
    title: "Cracking the coding interview",
    subtitle: "189 programming questions and solutions",
    author: "Gayle Laakmann McDowell",
    category: "Programming",
    publisher: "CareerCup, LLC",
  },
  {
    title: "No friend but the mountains",
    subtitle: "Writing from manu prison",
    author: "Behrouz Boochani",
    category: "Literature",
    publisher: "Pan Macmillan Australia",
  },
  {
    title: "Indian Harvest",
    subtitle: "Classic and contemporary vegetarian dishes",
    author: "Vikas Khanna",
    category: "Cuisine",
    publisher: "Bloomsbury USA",
  },
  {
    title: "Upheaval",
    subtitle: "Turning points for nations in crisis",
    author: "Jared Diamond",
    category: "Politics",
    publisher: "Little, Brown & Company",
  },
  {
    title: "Algorithms",
    subtitle: "Fourth Edition",
    author: "Robert Sedgewick, Kevin Wayne",
    category: "Programming",
    publisher: "Addison Wesley",
  },
  {
    title: "How We Die",
    subtitle: "Reflections on Life's Final Chapter",
    author: "Sherwin B. Nuland",
    category: "Literature",
    publisher: "Vintage",
  },
  {
    title: "The Circle",
    subtitle: "",
    author: "Dave Eggers",
    category: "Fiction",
    publisher: "Vintage",
  },
  {
    title: "The Algorithm Design Manual",
    subtitle: "",
    author: "Steven S. Skiena",
    category: "Programming",
    publisher: "Springer",
  },
  {
    title: "I Contain Multitudes",
    subtitle: "The microbes within us and a grander view of life",
    author: "Ed Yong",
    category: "Science",
    publisher: "HarperCollins",
  },
  {
    title: "The Silkwarm",
    subtitle: "A Cormoran Strike Novel",
    author: "Robert Galbraith",
    category: "Literature",
    publisher: "Mulholland Books",
  },
  {
    title: "Cosmos",
    subtitle: "",
    author: "Carl Sagan",
    category: "Science",
    publisher: "Ballantine Books",
  },
  {
    title: "Comanche Moon",
    subtitle: "",
    author: "Larry McMurtry",
    category: "Science",
    publisher: "Simon & Schuster",
  },
  {
    title: "Nine Pints",
    subtitle: "A journey through the money, medicine, and mysteries of blook",
    author: "Rose George",
    category: "Science",
    publisher: "Metropolitan books",
  },
];

var render = function (data) {
  var app = document.getElementById("app");
  var booksHTMLString =
    "<ul>" +
    data
      .map(function (book) {
        return (
          "<li>" +
          "<strong>Title: </strong>" +
          book.title +
          "<br/>" +
          "<strong>Subtitle: </strong>" +
          book.subtitle +
          "<br/>" +
          "<strong>Author: </strong>" +
          book.author +
          "<br/>" +
          "<strong>Category: </strong>" +
          book.category +
          "<br/>" +
          "<strong>Publisher: </strong>" +
          book.publisher +
          "<br/>" +
          "</li>"
        );
      })
      .join("");
  +"</ul>";

  app.innerHTML = booksHTMLString;
};
console.log(render(books));
