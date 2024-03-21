declare module '*.svg' {
  const content:
    | React.FunctionComponent<React.SVGAttributes<SVGElement>>
    | ImageSourcePropType;
  export default content;
}
