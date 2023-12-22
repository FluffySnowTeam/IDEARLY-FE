export interface ICompetitionsModal {
  isOpen: boolean;
  onClose: () => void;
  overlay: JSX.Element;
  startDateTime: string;
}
