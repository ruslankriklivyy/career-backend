export interface ICreateManyFilesPayload {
  userId?: number;
  decisionId?: number;
  applicationId?: number;
  files: Express.Multer.File[];
}
