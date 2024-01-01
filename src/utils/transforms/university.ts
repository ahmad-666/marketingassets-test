import dayjs from "dayjs";
import type {
  UniversityTableAttribute,
  UniversityResponse,
  University,
  CommentTableAttribute,
  CommentResponse,
  Comment,
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
    membership_list: JSON.parse(JSON.stringify(university.membership_list)),
    study_degree_level: Object.entries(
      JSON.parse(
        university.study_degree_level
          .replace(/True/g, "true")
          .replace(/False/g, "false")
          .replace(/'/g, '"')
      )
    ).map(([key, val]) => ({
      name: key,
      degreeLevel: {
        diploma: val["Diploma Associate Foundation"],
        bachelor: val["Bachelor"],
        master: val["Master"],
        doctorate: val["Doctorate"],
      },
    })),
    local_students_undergraduate: university.local_students_undergraduage,
    international_students_undergraduate:
      university.international_students_undergraduage,
  };
};
export const universityResponseToClient = (
  university: UniversityResponse
): University => {
  const websiteUrl = new URL(university.website);
  const websiteDomain = websiteUrl.hostname.replace("www.", "");
  return {
    id: university.id,
    name: university.name,
    imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL2}/logo/${websiteDomain}`,
    location: {
      continent: university.continent,
      country: university.country,
      countryCode: university.country_code,
      admissionOffice: university.admission_office,
    },
    social: {
      linkedin: university.linkedin_page,
      twitter: university.twitter_page,
      facebook: university.facebook_page,
      instagram: university.instagram_page,
      youtube: university.youtube_page,
      wikipedia: university.wikipedia_page,
      website: university.website,
      googleScholar: university.google_scholar_page,
    },
    contact: {
      address: university.address,
      fax: university.fax,
      tel: university.tel,
    },
    count: {
      staffs: university.academic_staff,
      students: university.student_enrollment,
    },
    features: {
      hasAbroadStudy: university.study_abroad,
      hasAcademicCounseling: university.academic_counseling,
      hasCareerServices: university.career_services,
      hasDistanceLearning: university.distance_learning,
      hasFinancialAid: university.financial_aids,
      hasHospital: university.housing,
      hasHousing: university.housing,
      hasLibrary: university.library,
      hasSportFacilities: university.sport_facilities,
    },
    fields: university.study_degree_level,
    memberships: university.membership_list,
    orgCode: university.org_code,
    overview: university.overview,
    pricing: {
      internationalPostGraduate: university.international_students_postgraduate,
      internationalUnderGraduate:
        university.international_students_undergraduate,
      localPostGraduate: university.local_students_postgraduate,
      localUnderGraduate: university.local_students_undergraduate,
    },
    rank: {
      admission: university.admission_rate,
      country: university.country_ranking,
      world: university.world_ranking,
    },
    restriction: {
      gender: university.gender,
      internationalStudent: university.international_students,
      religious: university.religious_affiliation,
    },
    type: {
      calendar: university.academic_calendar,
      campus: university.campus_setting,
      selection: university.selection_type,
      type: university.entity_type,
    },
  };
};
export const commentDbToResponse = (
  comment: CommentTableAttribute
): CommentResponse => {
  return {
    ...comment,
  };
};
export const commentResponseToClient = (comment: CommentResponse): Comment => {
  return {
    ...comment,
    date: dayjs(comment.createdAt).format("YYYY/MM/DD"),
    comment: comment.body,
  };
};
