export interface IPagiantion {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: 10;
  dataLength: number;
}
