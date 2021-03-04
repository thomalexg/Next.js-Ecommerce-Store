This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


//
import { deleteProduct } from '../cookies';

const indexToDelete= 1;

test('delete cookie of indexToDelete', () => {
  const visitsCookieValue = [{id: 1, quantity: 3, size: "S}, {id: 1, quantity: 5, size: "M}];
  const result = deleteProduct(
    indexToDelete,
    visitsCookieValue
  );
  expect(result).toEqual([{id: 1, quantity: 3, size: "S}]);
});

test('add new team member when cookie contains non-matching team member', () => {
  const visitsCookieValue = [{ teamMemberId: 2, visits: 2 }];
  const result = incrementVisitsByTeamMember(
    visitsCookieValue,
    teamMemberIdToAdd,
  );
  expect(result).toEqual([
    ...visitsCookieValue,
    { teamMemberId: teamMemberIdToAdd, visits: 1 },
  ]);
});

test('increment team member visits when cookie contains matching team member', () => {
  const visitsCookieValue = [{ teamMemberId: teamMemberIdToAdd, visits: 2 }];
  const result = incrementVisitsByTeamMember(
    visitsCookieValue,
    teamMemberIdToAdd,
  );
  expect(result).toEqual([{ teamMemberId: teamMemberIdToAdd, visits: 3 }]);
});
