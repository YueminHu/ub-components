export const classNames = (arg0: {
  [key: string]: boolean
}) => {
  let res = '';
  Object.entries(arg0).map(([k, v]) => v && (res += `${String(k)} `))
  return res
}