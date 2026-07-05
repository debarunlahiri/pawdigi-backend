export class PassportResponseDto {
  id: string;
  petId: string;
  passportNo: string;
  shareToken?: string | null;
  shareExpires?: Date | null;
  shareRevoked: boolean;
}
