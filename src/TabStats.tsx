export function TabStats({ data }: { data: never[] }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
