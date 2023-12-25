// [msw] src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import { IUserType } from "../../../pages/TeamMatchingPage/TeamMatchingPage.types";

const allPosts = new Map<number, IPost>();

export interface IPost {
  id: number,
  content: string,
}

export interface ICompetitionRequest {
  teamName: string,
  teammates: IUserType[],
}

interface IModifyUser {
  name: string
}
export const handlers = [
  // http.get('/posts', async ({ request }) => {

  //   const newPost: IPost = await request.json() as IPost;
  //   allPosts.set(newPost.id, newPost);
  //   console.log('Captured a "GET /posts" request')
  //   return HttpResponse.json(Array.from(allPosts.values()))

  // }),
  http.post('https://idearly.site/api/posts', async ({ request }) => {

    const temp = await request.json();
    console.log('Captured a "GET /posts" request', temp);
    return HttpResponse.json(Array.from(allPosts.values()))

  }),

  // 팀 생성
  http.post(`https://idearly.site/api/competitions/:competitionId`, async ({ request, params }) => {
    const { competitionId } = params;
    const nextPost: ICompetitionRequest = await request.json() as ICompetitionRequest;
    console.log('Updating post "%s" with:', competitionId, nextPost);
    if (nextPost.teamName === '함박눈') return new HttpResponse('중복된 이름입니다', {
      status: 409,
    });
    return HttpResponse.json();
  }),

  // 이메일로 회원 조회
  http.get(`https://idearly.site/api/competitions/:competitionId/members`, async ({ params, request }) => {
    const { competitionId } = params;
    console.log('competitionId: ', competitionId);

    const url = new URL(request.url)
    const email = url.searchParams.get('email')

    console.log('Updating get "%s" with:', email);
    if (email === 'aaa@naver.com') {
      return HttpResponse.json({
        status: "success",
        data: {
          exist: true,
          memberName: "이영민",
          email: "aaa@naver.com",
          invitable: true
        }
      });
    }
    if (email === 'bbb@naver.com') {
      return HttpResponse.json({
        status: "success",
        data: {
          exist: true,
          memberName: "강윤지",
          email: "bbb@naver.com",
          invitable: true
        }
      });
    }
    // else 
    return HttpResponse.json({
      status: "success",
      data: {
        exist: false,
      }
    });

  }),

  // 회원 탈퇴
  http.delete(`https://idearly.site/api/members`, async () => {
    console.log('회원 탈퇴');
    return HttpResponse.json({
      status: "success",
    });
  }),

  // 회원 정보 수정
  http.patch(`https://idearly.site/api/members`, async ({ request }) => {
    console.log('회원 정보 수정');

    // 숫자는 성공하는데, 영어나 한글은 실패하는 이슈 발생
    const temp: IModifyUser = await request.json() as IModifyUser;
    console.log('Captured a "patch /api/members" request', temp);

    return HttpResponse.json({
      status: "success",
      data: {
        email: "aaa@naver.com",
        name: temp,
      }
    });
  }),

  // 마이페이지 - 현재 팀 조회 
  http.get(`https://idearly.site/api/teams`, async ({request}) => {
    const url = new URL(request.url)
    const invite = url.searchParams.get('invite')

    console.log('invite === ', invite);
    console.log('Updating get "%s" with: 마이페이지 현재 팀 조회');
    if (invite === "true") {
      return HttpResponse.json({
        status: "success",
        data: {
          teams: [
            {
              teamId: 123,
              teamName: "snow",
              competitionId: 1,
              competitionTitle: "대회1",
              startDateTime: "2023-12-07T13:33:03.969Z",
              endDateTime: "2023-12-08T13:33:03.969Z",
              leaderName: "강윤지",
              leaderEmail: "dbswl701@naver.com"
            },
            {
              teamId: 456,
              teamName: "fluffy",
              competitionId: 2,
              competitionTitle: "대회2",
              startDateTime: "2023-12-07T13:33:03.969Z",
              endDateTime: "2023-12-08T13:33:03.969Z",
              leaderName: "이름1",
              leaderEmail: "aaa@naver.com"
            }
          ]
        }
      });
    } else {
      return HttpResponse.json({
        status: "success",
        data: {
          teams: [
            {
              teamId: 1234,
              teamName: "snow2",
              competitionId: 1,
              competitionTitle: "대회1",
              startDateTime: "2023-12-07T13:33:03.969Z",
              endDateTime: "2023-12-08T13:33:03.969Z",
              leaderName: "강윤지",
              leaderEmail: "dbswl701@naver.com"
            },
            {
              teamId: 4567,
              teamName: "fluffy2",
              competitionId: 2,
              competitionTitle: "대회2",
              startDateTime: "2023-12-07T13:33:03.969Z",
              endDateTime: "2023-12-08T13:33:03.969Z",
              leaderName: "이름1",
              leaderEmail: "aaa@naver.com"
            }
          ]
        }
      });
    }
  }),



  // 마이페이지 - 팀 요청 수락 / 거절
  http.post(`https://idearly.site/api/teams/:teamId`, async ({ request, params }) => {
    const { teamId } = params;
    const {accept} = await request.json() as REQ;
    console.log('teamId', teamId, 'accept: ', accept);
    if (accept){
      return HttpResponse.json({
        status: "success",
        data: {
          teamId: teamId,
          accept: true
        }
      });
    } else {
      return HttpResponse.json({
        status: "success",
        data: {
          teamId: teamId,
          accept: false
        }
      })
    }
  }),

  // 특정 팀 조회
  http.get(`https://idearly.site/api/teams/:teamId`, async ({ params }) => {
    const { teamId } = params;

    if (teamId == '123') {
      return HttpResponse.json({
        status: "success",
        data: {
          teamId: teamId,
          teamName: "snow",
          competitionId: 1,
          competitionName: "알고리즘 대회 이름",
          leaderName: "강윤지",
          leaderEmail: "dbswl701@naver.com",
          teammates: [
            {
              name: "강윤지",
              email: "dbswl701@naver.com",
              inviteStatus: "accept"
            },
            {
              name: "이름2",
              email: "bbb@naver.com",
              inviteStatus: "accept"
            },
            {
              name: "이름3",
              email: "ccc@naver.com",
              inviteStatus: "invite"
            }
          ]
        }
      });
    } else {
      return HttpResponse.json({
        status: "success",
        data: {
          teamId: teamId,
          teamName: "snow",
          competitionId: 1,
          competitionName: "알고리즘 대회 이름",
          leaderName: "이름1",
          leaderEmail: "aaa@naver.com",
          teammates: [
            {
              name: "이름12",
              email: "aaa@naver.com",
              inviteStatus: "accept"
            },
            {
              name: "이름22",
              email: "bbb@naver.com",
              inviteStatus: "accept"
            },
            {
              name: "이름32",
              email: "ccc@naver.com",
              inviteStatus: "invite"
            }
          ]
        }
      });
    }
 

  }),]

interface REQ {
  accept: boolean,
}

