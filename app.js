import Input from "./app/input.js";
import Provider from "./app/provider.js";

const inputSystem = new Input();
const provider = new Provider();

inputSystem.init()
console.log(provider.getOneWord())
