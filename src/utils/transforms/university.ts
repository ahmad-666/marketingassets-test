import type {
  UniversityTableAttribute,
  UniversityResponse,
} from "@/src/types/University";

export const universityDbToResponse = (
  university: UniversityTableAttribute
): UniversityResponse => {
  return {
    ...university,
    international_students: university.international_students === "yes",
    library: university.library === "yes",
    housing: university.housing === "yes",
    sport_facilities: university.sport_facilities === "yes",
    financial_aids: university.financial_aids === "yes",
    study_abroad: university.study_abroad === "yes",
    distance_learning: university.distance_learning === "yes",
    academic_counseling: university.academic_counseling === "yes",
    career_services: university.career_services === "yes",
    institutional_hospital: university.institutional_hospital === "yes",
    membership_list: JSON.parse(university.membership_list),
    study_degree_level: Object.entries(
      JSON.parse(university.study_degree_level)
    ).map(([key, val]) => ({
      name: key,
      degreeLevel: {
        diploma: val["Diploma Associate Foundation"] === "True",
        bachelor: val["Bachelor"] === "True",
        master: val["Master"] === "True",
        doctorate: val["Doctorate"] === "True",
      },
    })),
    local_students_undergraduate: university.local_students_undergraduage,
    international_students_undergraduate:
      university.international_students_undergraduage,
  };
};
