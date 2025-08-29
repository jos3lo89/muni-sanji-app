import { Office, User } from "@prisma/client";

export interface UserWithOffice extends User {
  office: Office;
}
