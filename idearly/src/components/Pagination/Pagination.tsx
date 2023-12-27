import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import * as S from "./Pagination.styles";
import { PropsWithChildren } from "react";
import type { IPagiantion } from "./Pagination.types";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  dataLength,
}: PropsWithChildren<IPagiantion>) => {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(dataLength / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePaginationClick = (cur: number | string) => {
    if (typeof cur === "number") {
      setCurrentPage(cur);
    } else {
      switch (cur) {
        case "prevPage":
          setCurrentPage((prev) => (prev >= 1 ? prev - 1 : prev));
          break;
        case "nextPage":
          setCurrentPage((prev) =>
            prev < pageNumbers.length - 1 ? prev + 1 : prev
          );
          break;
        case "firstPage":
          setCurrentPage(0);
          break;
        case "lastPage":
          setCurrentPage(pageNumbers.length - 1);
          break;
      }
    }
    window.scrollTo(0, 0);
  };

  return (
    <S.PaginationWrapper>
      <S.PaginationContainer>
        <S.PaginationIconButton
          isRound={true}
          variant="solid"
          colorScheme="facebook"
          size="xs"
          aria-label="Done"
          fontSize="20px"
          icon={<ArrowLeftIcon w={3} h={3} />}
          onClick={() => {
            handlePaginationClick("firstPage");
          }}
        />
        <S.PaginationIconButton
          isRound={true}
          variant="solid"
          colorScheme="facebook"
          size="xs"
          aria-label="Done"
          fontSize="20px"
          icon={<ChevronLeftIcon />}
          onClick={() => {
            handlePaginationClick("prevPage");
          }}
        />

        {pageNumbers.map((pageNum) => (
          <S.PaginationButton
            key={pageNum}
            isActive={currentPage === pageNum}
            onClick={() => {
              handlePaginationClick(pageNum);
            }}
            size="xs"
            variant="outline"
          >
            {pageNum + 1}
          </S.PaginationButton>
        ))}

        <S.PaginationIconButton
          isRound={true}
          variant="solid"
          colorScheme="facebook"
          size="xs"
          aria-label="Done"
          fontSize="20px"
          icon={<ChevronRightIcon />}
          onClick={() => {
            handlePaginationClick("nextPage");
          }}
        />
        <S.PaginationIconButton
          isRound={true}
          variant="solid"
          colorScheme="facebook"
          size="xs"
          aria-label="Done"
          fontSize="20px"
          icon={<ArrowRightIcon w={3} h={3} />}
          onClick={() => {
            handlePaginationClick("lastPage");
          }}
        />
      </S.PaginationContainer>
    </S.PaginationWrapper>
  );
};
