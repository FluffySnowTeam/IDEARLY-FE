import { useParams } from "react-router-dom";

export const PrevCompeProblemList = () => {
  const { id: competitionId } = useParams<{ id: string }>();

  return (
    <div>
      <div>이전 대회 문제 리스트</div>
    </div>
  );
};
