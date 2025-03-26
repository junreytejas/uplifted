export enum DaxtraAction {
  UPDATE_VACANCY = 'update_vacancy',
  ADD_VACANCY = 'add_vacancy',
  MATCH_VACANCY_TO_CANDIDATES = 'match_vacancy_to_candidates',
  UPDATE_CANDIDATE = 'update_candidate',
  ADD_CANDIDATE = 'add_candidate',
  MATCH_CANDIDATE_TO_VACANCIES = 'match_candidate_to_vacancies',
  DELETE_VACANCIES = 'delete_vacancies',
  UPSERT_VACANCY = 'upsert_vacancy',
  SET_VACANCY_STATUS = 'set_vacancy_status',
  UPSERT_CANDIDATE = 'upsert_candidate',
}

export enum DxVacancyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  RMS_EXPORTED = 'rms_exported',
  ORIGIN_PLACED = 'origin_placed',
  OPEN = ACTIVE,
  CLOSED = INACTIVE,
  'ON HOLD' = INACTIVE,
  FILLED = INACTIVE,
  CANCELLED = DELETED,
  EXPIRED = INACTIVE,
  IGNORED = INACTIVE,
}
