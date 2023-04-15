import nc from "next-connect";
import bcrypt from "bcryptjs";
import axios from "axios";
import client from "@/utils/client";
import { signToken } from "@/utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  console.log("hit handler")
  const projectId = client.projectId;
  const dataset = client.dataset;
  const apiVersion = client.apiVersion;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  const createMutations = [
    {
      create: {
        _type: "user",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
        isWholesale: false,
      },
    },
  ];
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`,
    {
      mutations: createMutations,
    },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );
  const userId = data.results[0].id;
  const user = {
    _id: userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    isWholesale: false,
    isAdmin: false,
  };

  const token = signToken(user);
  res.send({ ...user, token });
});

export default handler;
