declare module '*.json' {
  const value: any;
  export default value;
}

declare interface JQuery {
  modal(options?: any): any;
}