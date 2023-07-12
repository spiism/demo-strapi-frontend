    // import NextAuth from "next-auth";
    // // import Providers from "next-auth/providers";
    // import GoogleProvider from "next-auth/providers/google"
    
    // const options = {
    //   providers: [
    //     GoogleProvider({
    //       clientId: process.env.GOOGLE_CLIENT_ID,
    //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     }),
    //   ],
    //   database: process.env.NEXT_PUBLIC_DATABASE_URL,
    //   session: {
    //     jwt: true,
    //   },
    //   callbacks: {
    //     session: async (session, user) => {
    //       session.jwt = user.jwt;
    //       session.id = user.id;
    //       return Promise.resolve(session);
    //     },
    //     jwt: async (token, user, account) => {
    //       const isSignIn = user ? true : false;
    //       if (isSignIn) {
    //         console.log("Google Account >>>>>>>>>>>>>> ", account);
    //         const response = await fetch(
    //           `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.access_token}`
    //         );
    //         const data = await response.json();
    //         token.jwt = data.jwt;
    //         token.id = data.user.id;
    //       }

    //       return Promise.resolve(token);
    //     },
    //   },
   
    // };
    
    // console.log(options);
    // const Auth = (req, res) =>
    //   NextAuth(req, res, options);
    
    // export default Auth;








    import { NextApiRequest, NextApiResponse } from "next";
    import NextAuth  from "next-auth";
    import GoogleProvider from "next-auth/providers/google";
    
    export const authOptions = {
      providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
          clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        }),
      ],
      
      callbacks: {
        // This method is not invoked when you persist sessions in a database.
        async jwt({ token, account }) {
          if (account) {
            console.log("Google Account >>>>>>>>>>>>>> ", account);
            const res = await fetch(
              `${process.env.STRAPI_BACKEND_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`
            );
            const data = await res.json();
            const { jwt, user } = data;
            token.accessToken = jwt;
            token.userId = user.id;
          }
          return token;
        },
    
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token from a provider.
          session.user.accessToken = token.accessToken ;
          session.user.userId = token.userId ;
          return session;
        },
      },
      
      session: {
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        strategy: "jwt",
      },
      
      // Not providing any secret or NEXTAUTH_SECRET will throw an error in production.
      secret: process.env.NEXTAUTH_SECRET,
    };
    
    const auth = (req, res) =>
      NextAuth(req, res, authOptions);
    
    export default auth;