import { v4 as uuidv4 } from "uuid";
// let user1 = uuidv4();
// let user2 = uuidv4();
export let users = {
  [uuidv4()]: {
    name: "Piyush",
    location: "Hyd"
  },
  [uuidv4()]: {
    name: "Monisha",
    location: "Pune"
  }
};
// export let users = [
//   {
//     id: 1,
//     name: "Piyush",
//     location: "Hyd"
//   },
//   {
//     id: 2,
//     name: "Monisha",
//     location: "Pune"
//   }
// ];
