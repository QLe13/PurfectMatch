declare type Coordinate = [number, number];

declare type Pet = {
  name: string;
  age: number;
  type: "Cat"| "Dog"| "Fish"| "Squirrel"|"Reptile"| "Amphibian"|"Racoon"| "Hamster"| "Rabbit"| "Spider"| "Insect"| "Pig"|'';
  price: number;
  location: Coordinate;
};

