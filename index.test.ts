import { describe, it, expect } from "@jest/globals";
import { Person } from "./index";

describe("Person", () => {
  it("creates a person and trims the name", () => {
    const person = new Person("  Paco  ", 38);

    expect(person.name).toBe("Paco");
    expect(person.age).toBe(38);
    expect(person.get("name")).toBe("Paco");
    expect(person.get("age")).toBe(38);
  });

  it("throws for an empty name", () => {
    expect(() => new Person("   ", 20)).toThrow(
      new TypeError("name must be a non-empty string")
    );
  });

  it("throws for an invalid age", () => {
    expect(() => new Person("Paco", -1)).toThrow(
      new TypeError("age must be a non-negative finite number")
    );
    expect(() => new Person("Paco", Number.POSITIVE_INFINITY)).toThrow(
      new TypeError("age must be a non-negative finite number")
    );
  });
});
