import { Model, DataTypes } from "sequelize";
import connection from "../connection";
import type {
  UniversityTableAttribute,
  UniversityTableCreationAttribute,
} from "@/src/types/University";

const createUniversitiesModel = () => {
  class Universities extends Model<
    UniversityTableAttribute,
    UniversityTableCreationAttribute
  > {
    declare id: number;
    declare name: string;
    declare country: string;
    declare continent: string;
    declare logo_name: string;
    declare country_ranking: number;
    declare world_ranking: number;
    declare overview: string;
    declare country_code: string;
    declare address: string;
    declare tel: string;
    declare fax: string;
    declare website: string;
    declare gender: string;
    declare international_students: string;
    declare selection_type: string;
    declare admission_rate: string;
    declare admission_office: string;
    declare student_enrollment: string;
    declare academic_staff: string;
    declare entity_type: string;
    declare academic_calendar: string;
    declare campus_setting: string;
    declare religious_affiliation: string;
    declare library: string;
    declare housing: string;
    declare sport_facilities: string;
    declare financial_aids: string;
    declare study_abroad: string;
    declare distance_learning: string;
    declare academic_counseling: string;
    declare career_services: string;
    declare institutional_hospital: string;
    declare membership_list: string;
    declare study_degree_level: string;
    declare local_students_undergraduage: string;
    declare local_students_postgraduate: string;
    declare international_students_undergraduage: string;
    declare international_students_postgraduate: string;
    declare wikipedia_page: string;
    declare instagram_page: string;
    declare youtube_page: string;
    declare facebook_page: string;
    declare twitter_page: string;
    declare linkedin_page: string;
    declare google_scholar_page: string;
    declare org_code: string;
  }
  Universities.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_ranking: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      world_ranking: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      overview: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fax: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      international_students: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      selection_type: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      admission_rate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admission_office: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      student_enrollment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      academic_staff: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entity_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      academic_calendar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      campus_setting: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      religious_affiliation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      library: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      housing: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sport_facilities: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      financial_aids: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      study_abroad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      distance_learning: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      academic_counseling: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      career_services: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      institutional_hospital: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      membership_list: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      study_degree_level: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      local_students_undergraduage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      local_students_postgraduate: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      international_students_undergraduage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      international_students_postgraduate: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      wikipedia_page: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      instagram_page: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      youtube_page: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebook_page: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      twitter_page: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkedin_page: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      google_scholar_page: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      org_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: connection,
      modelName: "universities",
      timestamps: false,
    }
  );

  return Universities;
};

export default createUniversitiesModel();
