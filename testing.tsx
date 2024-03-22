type StringRecord = Record<string, number>;

const user: StringRecord = {
  age: 20,
  height: 120,
  power: 400,
};

// so above is alternative of

type UserAbility = {
  age: number;
  height: number;
  power: number;
};

type Another = Record<'user' | 'buddy', string>;

const an: Another = {
  user: 'testing',
  buddy: 'hellow',
};

type Foo = {
  title: string;
  page: number;
};

const foo = {
  title: 'Foo bar is super cool',
  page: 20,
} as Foo;

enum Mechanic {
  name = 'Micheal',
}

const nameMechanic = Mechanic.name;
