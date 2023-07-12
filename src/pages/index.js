// import { useSession, signIn, signOut } from "next-auth/react";

// export default function IndexPage() {
//   const { data: session, status } = useSession();

//   const isLoading = status === "loading";
//   if (isLoading) return "Loading...";

//   if (session) {
//     console.log(session);
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     );
//   }

//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   );
// }



import React from 'react';

function HomePage() {
  return <h1>Welcome to the Next.js App!</h1>;
}

export default HomePage;
