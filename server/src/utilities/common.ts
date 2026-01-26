import { DEFAULT_PAGE_SIZE, VERIFICATION_TOEKN_LENGTH } from "@/constants/app";
import { ERROR_MESSAGES, STRINGS } from "@/constants/messages";
import type { FastifyReply } from "fastify";

const successCodes = [200, 201];

export const generateOTP = (length = VERIFICATION_TOEKN_LENGTH) => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
};

export const paginateData = ({
  items,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
}: { page?: number, pageSize?: number, items: any[] }) => {
  const startIndex = (Number(page) - 1) * Number(pageSize);
  const endIndex = startIndex + Number(pageSize);
  const _items = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / Number(pageSize));

  const data: any = {
    pageSize,
    totalPages,
    items: _items,
    total: items.length,
    currentPage: page,
  };
  return data;
};

export const paginateItems = ({
  page,
  pageSize,
  items,
  total,
}: {
  page: number;
  pageSize: number;
  items: any;
  total: number;
}) => {
  const totalPages = total ? Math.ceil(total / pageSize) : 0;
  const data: any = {
    items,
    pageSize,
    totalPages,
    currentPage: page,
    total: total,
  };
  return data;
};


export const constructResponse = ({
  reply,
  message,
  data = {},
  code,
  apiObject,
}: {
  reply: FastifyReply;
  message?: string;
  data?: any;
  code: number;
  apiObject: string;
}) => {
  const isSuccess = successCodes.includes(code);
  if (process.env.NODE_ENV === "development" || process.env.DOMAIN?.includes("dev")) {
    if (!isSuccess) {
      console.log("isSuccess", isSuccess)
      console.log(
        "[error]:",
        code,
        reply.request.method,
        reply.request.originalUrl,
        message,
        // reply.req.route,
        data?.toString() === "[object Object]" ? data : data?.toString(),
      );
    } else {
      console.log("[success]:", code, reply.request.method, reply.request.originalUrl)
    }
  }

  const _res = {
    apiObject,
    code,
    message:
      message ||
      (isSuccess
        ? STRINGS.Success
        : ERROR_MESSAGES.InternalServerError),
    data: isSuccess ? data : {},
  };
  return reply.status(code).send(_res) as any;
};

export const getFirstName = (name = "") => {
  return name.split(" ")[0] || "";
};

export const getLastName = (name = "") => {
  return name.split(" ").slice(1).join("") || "";
};
