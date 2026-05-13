import myNumber from "./aux";

type PersonField = "name" | "age";

export class Person {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    if (name.trim() === "") {
      throw new TypeError("name must be a non-empty string");
    }

    if (!Number.isFinite(age) || age < 0) {
      throw new TypeError("age must be a non-negative finite number");
    }

    this.name = name.trim();
    this.age = age;
  }

  get<K extends PersonField>(prop: K): Person[K] {
    // Only allow access to known fields to keep the return type precise.
    return this[prop];
  }
}

if (require.main === module) {
  console.log("Hello World");
  console.log("I'm gonna get acquainted with Cursor and see how it works");
  const person = new Person("Paco", 38);
  console.log(person.get("age"));
  console.log(myNumber);
}

