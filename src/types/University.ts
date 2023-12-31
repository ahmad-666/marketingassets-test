import { type Optional } from "sequelize";
import type { ServerMeta } from "./Common";

//Basic Types
export type Type = {
  type: string;
  selection: string;
  calendar: string;
  campus: string;
};
export type Rank = {
  world: number;
  country: number;
  admission: string;
};
export type Count = {
  students: string;
  staffs: string;
};
export type Pricing = {
  localUnderGraduate: string;
  localPostGraduate: string;
  internationalUnderGraduate: string;
  internationalPostGraduate: string;
};
export type DegreeLevel = {
  diploma: boolean;
  bachelor: boolean;
  master: boolean;
  doctorate: boolean;
};
export type Field = {
  name: string;
  degreeLevel: DegreeLevel;
};
export type Restriction = {
  gender: string;
  internationalStudent: boolean;
  religious: string;
};
export type Features = {
  hasHousing: boolean;
  hasLibrary: boolean;
  hasSportFacilities: boolean;
  hasFinancialAid: boolean;
  hasAbroadStudy: boolean;
  hasDistanceLearning: boolean;
  hasAcademicCounseling: boolean;
  hasCareerServices: boolean;
  hasHospital: boolean;
};
export type Location = {
  continent: string;
  country: string;
  countryCode: string;
  admissionOffice: string;
};
export type Contact = {
  address: string;
  tel: string;
  fax: string;
};
export type Social = {
  website: string;
  wikipedia: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  youtube: string;
  instagram: string;
  googleScholar: string;
};
//University
export type University = {
  id: number;
  name: string;
  imgSrc: string;
  orgCode?: string;
  overview?: string;
  memberships?: string[];
  type?: Type;
  rank?: Rank;
  count?: Count;
  pricing?: Pricing;
  fields?: Field[];
  restriction?: Restriction;
  features?: Features;
  location?: Location;
  contact?: Contact;
  social?: Social;
};
export type GetUniversities = {
  items: University[];
  totalCount: number;
};
export type UniversityFilter = {
  name: string;
};
export type UniversitiesFilters = {
  search?: string;
  page?: number;
  pageSize?: number;
};
export type UniversityResponse = {
  id: number;
  name: string;
  country: string;
  continent: string;
  logo_name: string;
  country_ranking: number;
  world_ranking: number;
  overview: string;
  country_code: string;
  address: string;
  tel: string;
  fax: string;
  website: string;
  gender: string;
  international_students: boolean;
  selection_type: string;
  admission_rate: string;
  admission_office: string;
  student_enrollment: string;
  academic_staff: string;
  entity_type: string;
  academic_calendar: string;
  campus_setting: string;
  religious_affiliation: string;
  library: boolean;
  housing: boolean;
  sport_facilities: boolean;
  financial_aids: boolean;
  study_abroad: boolean;
  distance_learning: boolean;
  academic_counseling: boolean;
  career_services: boolean;
  institutional_hospital: boolean;
  membership_list: string[];
  study_degree_level: Field[];
  local_students_undergraduate: string;
  local_students_postgraduate: string;
  international_students_undergraduate: string;
  international_students_postgraduate: string;
  wikipedia_page: string;
  instagram_page: string;
  youtube_page: string;
  facebook_page: string;
  twitter_page: string;
  linkedin_page: string;
  google_scholar_page: string;
  org_code: number | string;
};
export type GetUniversityResponse = UniversityResponse;
export type GetUniversitiesResponse = {
  items: UniversityResponse[];
} & ServerMeta;
export type UniversityTableAttribute = {
  id: number;
  name: string;
  country: string;
  continent: string;
  logo_name: string;
  country_ranking: number;
  world_ranking: number;
  overview: string;
  country_code: string;
  address: string;
  tel: string;
  fax: string;
  website: string;
  gender: string;
  international_students: string;
  selection_type: string;
  admission_rate: string;
  admission_office: string;
  student_enrollment: string;
  academic_staff: string;
  entity_type: string;
  academic_calendar: string;
  campus_setting: string;
  religious_affiliation: string;
  library: string;
  housing: string;
  sport_facilities: string;
  financial_aids: string;
  study_abroad: string;
  distance_learning: string;
  academic_counseling: string;
  career_services: string;
  institutional_hospital: string;
  membership_list: string;
  study_degree_level: string;
  local_students_undergraduage: string;
  local_students_postgraduate: string;
  international_students_undergraduage: string;
  international_students_postgraduate: string;
  wikipedia_page: string;
  instagram_page: string;
  youtube_page: string;
  facebook_page: string;
  twitter_page: string;
  linkedin_page: string;
  google_scholar_page: string;
  org_code: string;
};
export type UniversityTableCreationAttribute = Optional<
  UniversityTableAttribute,
  "id"
>;
//University Comment
export type Comment = {
  id: number;
  date: string;
  userName: string;
  userEmail?: string;
  comment: string;
  rate: number;
};
export type GetComments = {
  items: Comment[];
  totalCount: number;
};
export type CommentFilters = {
  universityId: number;
  page?: number;
  pageSize?: number;
};
export type CommentReqBody = {
  universityId: number;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
};
export type CommentResponse = {
  id: number; //commentId
  createdAt: Date;
  updatedAt: Date;
  universityId: number;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
};
export type GetCommentsResponse = {
  items: CommentResponse[];
} & ServerMeta;
export type CommentTableAttribute = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
  universityId: number;
};
export type CommentTableCreationAttribute = Optional<
  CommentTableAttribute,
  "id" | "createdAt" | "updatedAt"
>;
