import { Office } from "@prisma/client";

export interface OfficeWithRelations extends Office {
  subOffices: Office[];
  parentOffice: Office | null;
}
