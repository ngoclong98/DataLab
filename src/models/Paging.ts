export default interface Paging<T> {
  list: T[];
  nextPageId: string | null;
  count?: number | null;
}
