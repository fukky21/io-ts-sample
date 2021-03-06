import express from 'express';
import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';
import reporter from 'io-ts-reporters';

// 性別を定義
const GenderTypes = {
  male: 'male',
  female: 'female',
  other: 'other',
};
const Gender = t.keyof(GenderTypes);

// オリジナル型(PositiveNumber)を定義
interface IPositiveNumber {
  readonly PositiveNumber: unique symbol // use `unique symbol` here to ensure uniqueness across modules / packages
};
const PositiveNumber = t.brand(
  t.number, // a codec representing the type to be refined
  (n): n is t.Branded<number, IPositiveNumber> => 0 < n, // a custom type guard using the build-in helper `Branded`
  'PositiveNumber' // the name must match the readonly field in the brand
);
const PositiveInt = t.intersection([t.Int, PositiveNumber]);

// オリジナル型(Email)を定義
const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface IEmail {
  readonly Email: unique symbol; // use `unique symbol` here to ensure uniqueness across modules / packages
};
const Email = t.brand(
  t.string, // a codec representing the type to be refined
  (input): input is t.Branded<string, IEmail> => REGEX_EMAIL.test(input), // a custom type guard using the build-in helper `Branded`
  'Email' // the name must match the readonly field in the brand
);

// User型を定義
const User = t.type({
  id: t.number,
  name: NonEmptyString,
  age: PositiveInt,
  gender: Gender,
  email: Email,
});
type IUser = t.TypeOf<typeof User>;

// 仮想User配列を定義
const users: IUser[] = [];

// 次に追加されるユーザーのID
let nextUserId = 1;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (_, res) => {
  res.status(200).json({ 'users': users });
});

app.post('/users', (req, res) => {
  const data: IUser = {
    id: nextUserId,
    ...req.body,
  };
  const validation = User.decode(data);
  const result = reporter.report(validation);

  if (result.length) {
    res.status(400).json({ 'errors': result });
    return;
  }

  users.push(data);
  nextUserId++;
  res.status(201).json({ 'message': 'OK' });
});

app.listen(3000, () => console.log('Server is running...'));
