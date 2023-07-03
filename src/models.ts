export const enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}
