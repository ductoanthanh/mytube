import { PrismaClient } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const prisma = new PrismaClient();

async function googleLogin(req, res) {
  const { idToken } = req.body;
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, picture, email } = ticket.getPayload();

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        username: name,
        avatar: picture,
      },
    });
  }

  const tokenPayload = { id: user.id };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie('token', token, { httpOnly: true });
  res.status(200).send(token);
}

async function me(req, res) {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      subscriberId: {
        equals: req.user.id,
      },
    },
  });

  const channelIds = subscriptions.map((sub) => sub.subscribedToId);

  const channels = await prisma.user.findMany({
    where: {
      id: {
        in: channelIds,
      },
    },
  });

  const user = req.user;
  user.channels = channels;

  res.status(200).json({ user });
}

function signout(req, res) {
  res.clearCookie('token');
  res.status(200).json({});
}

module.exports = { googleLogin, me, signout };
