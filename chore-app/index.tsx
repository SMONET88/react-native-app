// Polyfill setImmediate for browsers
if (typeof globalThis.setImmediate === "undefined") {
  (globalThis as any).setImmediate = (
    fn: (...args: any[]) => void,
    ...args: any[]
  ) => setTimeout(() => fn(...args), 0);
}

import { registerRootComponent } from "expo";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);

registerRootComponent(App);
