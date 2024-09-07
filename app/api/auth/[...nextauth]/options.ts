import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials,req) {
        const userinfo = { id: "42", username: "Dave", password: "nextauth" }
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials

        axios.defaults.baseURL = process.env.BASE_URL;

        const user= await 
            axios
          .post(
            "/login",
            {
              username: credentials?.username,
              password: credentials?.password,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data === "success") {
                console.log("success");
              return userinfo;
            } else{
                console.log("failed");
                 return null;}
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
        

        return user

      },
    }),
  ],
};
