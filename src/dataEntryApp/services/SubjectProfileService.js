import api from "../api";
import { mapProfile } from "../../common/subjectModelMapper";
import _ from "lodash";

class SubjectProfileService {
  constructor() {
    this.subjectProfiles = new Map();
    this.debouncedFetchSubjectByUUID = _.debounce(this.fetchSubjectByUUID, 500, {
      leading: true,
      trailing: false
    });
  }

  getSubjectByUUID(subjectUuid) {
    return this.subjectProfiles.get(subjectUuid);
  }

  findSubjectByUUID(subjectUuid) {
    return this.subjectProfiles.has(subjectUuid);
  }

  get getDebouncedFetchSubjectByUUIDFunc() {
    return this.debouncedFetchSubjectByUUID;
  }

  /**
   * Makes a call to upsert the subjectProfile entity stored in subjectProfileService for that subjectUuid.
   */
  fetchSubjectByUUID(subjectUuid) {
    api
      .fetchSubjectProfile(subjectUuid)
      .then(subjectProfileJson => {
        const subjectProfile = mapProfile(subjectProfileJson);
        this.addSubject(subjectUuid, subjectProfile);
      })
      .catch(error => {
        console.error(`Failed to fetch latest value of the individual from backend server for uuid: ${subjectUuid} Error: ${error}`);
        this.resetSubject(subjectUuid);
      });
  }

  addSubject(uuid, subject) {
    this.subjectProfiles.set(uuid, subject);
  }

  resetSubject(subjectUuid) {
    this.subjectProfiles.delete(subjectUuid);
  }
}

export const subjectProfileService = new SubjectProfileService();
