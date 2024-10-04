import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/app/db";

export async function GET(req: Request) {
  return new Response("OK!", { status: 200 });
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }
  const { id } = evt.data;
  const eventType = evt.type;

  switch (eventType) {
    case "user.created":
      const { first_name, last_name, image_url, id, email_addresses } =
        payload.data;
      const { email_address } = email_addresses[0];

      await prisma.user.create({
        data: {
          externalId: id,
          email: email_address,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
        },
      });
      break;
    case "user.updated":
      await prisma.user.update({
        where: {
          externalId: payload.data.id,
        },
        data: {
          imageUrl: payload.data.image_url,
        },
      });
      break;
    case "user.deleted":
      await prisma.user.delete({
        where: {
          externalId: payload.data.id,
        },
      });
      break;
  }

  return new Response("", { status: 200 });
}
