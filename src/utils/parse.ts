import { validate } from "uuid";

const parse = (url: string): string | null => {
  const urlParams: string[] = url.split("/api/users");
  if (urlParams[1]?.length) {
    const id: string = urlParams[1].slice(1);
    if (!validate(id)) throw new Error("400: Invalid id");
    return id;
  }
  return null;
};

export { parse };
