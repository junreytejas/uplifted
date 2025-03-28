export class CreateJournalDto {
  title: string;
  verse: string;
  scripture: string;
  reflection: string;
  discussion: string[];
  created_by?: string;
  custom_content: string;
}
