// import { mongodbAdapter } from "@better-auth/mongo-adapter";
// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db("chef-world-users");

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//   },

//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   },

//   database: mongodbAdapter(db, {
//     client,
//   }),

//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         defaultValue: "user",
//         input: false,
//       },
//       isPremium: {
//         type: "boolean",
//         defaultValue: false,
//         input: false,
//       },
//       isBlocked: {
//         type: "boolean",
//         defaultValue: false,
//         input: false,
//       },
//     },
//   },

//   databaseHooks: {
//     user: {
//       create: {
//         before: async (user) => {
//           return {
//             data: {
//               ...user,
//               role: "user",
//               isPremium: false,
//               isBlocked: false,
//             },
//           };
//         },
//       },
//     },
//   },
// });


import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("chef-world-users");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false,
      },
      isPremium: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
      isBlocked: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: "user",
              isPremium: false,
              isBlocked: false,
            },
          };
        },
      },
    },
    session: {
      create: {
        before: async (session) => {
          try {
            let targetId = session.userId;
            if (typeof targetId === "string" && ObjectId.isValid(targetId)) {
              targetId = new ObjectId(targetId);
            }

            const user = await db.collection("user").findOne({
              $or: [{ _id: targetId }, { _id: session.userId }],
            });

            if (user && user.isBlocked === true) {
              throw new Error("USER_BLOCKED");
            }

            return { data: session };
          } catch (err) {
            if (err.message === "USER_BLOCKED") {
              throw err;
            }
            console.error("Session Hook Error:", err);
            return { data: session };
          }
        },
      },
    },
  },

  session: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    cookieCache: {
      enabled: true,
    },
  },

  plugins: [jwt()]
});