import { useLocalStorage } from "./use-local-storage";

export type Course = {
  id: string;
  code: string;
  title: string;
  credits: number;
  grade: string;
  gpa: number;
  semester: string;
  status: "completed" | "running";
};

export const INITIAL_COURSES: Course[] = [
  { id: "1",  code: "MATH101",  title: "Discrete Math",                credits: 3, grade: "A",  gpa: 4.00, semester: "242", status: "completed" },
  { id: "2",  code: "CSE101",   title: "Intro to Computer Systems",    credits: 1, grade: "A",  gpa: 4.00, semester: "242", status: "completed" },
  { id: "3",  code: "ENG101",   title: "English I",                    credits: 3, grade: "B+", gpa: 3.33, semester: "242", status: "completed" },
  { id: "4",  code: "HIST101",  title: "History of Bangladesh",        credits: 2, grade: "A",  gpa: 4.00, semester: "242", status: "completed" },
  { id: "5",  code: "CSE103",   title: "Structured Programming",       credits: 3, grade: "A",  gpa: 4.00, semester: "243", status: "completed" },
  { id: "6",  code: "CSE104",   title: "SPL Lab",                      credits: 1, grade: "A",  gpa: 4.00, semester: "243", status: "completed" },
  { id: "7",  code: "CSE105",   title: "Digital Logic",                credits: 3, grade: "A",  gpa: 4.00, semester: "243", status: "completed" },
  { id: "8",  code: "CSE106",   title: "DLD Lab",                      credits: 1, grade: "A",  gpa: 4.00, semester: "243", status: "completed" },
  { id: "9",  code: "MATH103",  title: "Fundamental Calculus",         credits: 3, grade: "A",  gpa: 4.00, semester: "243", status: "completed" },
  { id: "10", code: "CSE203",   title: "OOP",                          credits: 3, grade: "A",  gpa: 4.00, semester: "251", status: "completed" },
  { id: "11", code: "CSE204",   title: "OOP Lab",                      credits: 1, grade: "A",  gpa: 4.00, semester: "251", status: "completed" },
  { id: "12", code: "MATH201",  title: "Calculus & Linear Algebra",    credits: 3, grade: "A",  gpa: 4.00, semester: "251", status: "completed" },
  { id: "13", code: "STAT201",  title: "Probability & Statistics",     credits: 3, grade: "A",  gpa: 4.00, semester: "251", status: "completed" },
  { id: "14", code: "CSE205",   title: "DSA I",                        credits: 3, grade: "A",  gpa: 4.00, semester: "252", status: "completed" },
  { id: "15", code: "CSE206",   title: "DSA I Lab",                    credits: 1, grade: "A",  gpa: 4.00, semester: "252", status: "completed" },
  { id: "16", code: "CSE207",   title: "Theory of Computation",        credits: 3, grade: "A",  gpa: 4.00, semester: "252", status: "completed" },
  { id: "17", code: "MATH203",  title: "Coordinate Geometry",          credits: 3, grade: "A",  gpa: 4.00, semester: "252", status: "completed" },
  { id: "18", code: "CSE209",   title: "DSA II",                       credits: 3, grade: "A",  gpa: 4.00, semester: "253", status: "completed" },
  { id: "19", code: "CSE210",   title: "DSA II Lab",                   credits: 1, grade: "A",  gpa: 4.00, semester: "253", status: "completed" },
  { id: "20", code: "EEE201",   title: "Electrical Circuits",          credits: 3, grade: "A",  gpa: 4.00, semester: "253", status: "completed" },
  { id: "21", code: "PHY101",   title: "Physics",                      credits: 3, grade: "A",  gpa: 4.00, semester: "253", status: "completed" },
  { id: "22", code: "PHY102",   title: "Physics Lab",                  credits: 1, grade: "A",  gpa: 4.00, semester: "253", status: "completed" },
  // Running trimester 262
  { id: "23", code: "CSE3313",  title: "Computer Architecture",        credits: 3, grade: "A",  gpa: 4.00, semester: "262", status: "running" },
  { id: "24", code: "CSE3521",  title: "Database Management Systems",  credits: 3, grade: "A",  gpa: 4.00, semester: "262", status: "running" },
  { id: "25", code: "EEE2123",  title: "Electronics",                  credits: 3, grade: "A",  gpa: 4.00, semester: "262", status: "running" },
  { id: "26", code: "EEE2124",  title: "Electronics Lab",              credits: 1, grade: "A",  gpa: 4.00, semester: "262", status: "running" },
];

// Current trimester label (editable)
export const INITIAL_CURRENT_TRIMESTER = "262";

export type SelfReview = {
  id: string; task: string; duration: string; completed: boolean; notes: string;
};

export const INITIAL_REVIEWS: SelfReview[] = [
  { id: "1", task: "DSA Fundamentals Revision",      duration: "1.5 hrs", completed: false, notes: "" },
  { id: "2", task: "Mathematics Core Review",         duration: "1.5 hrs", completed: false, notes: "" },
  { id: "3", task: "Structured Programming Practice", duration: "1 hr",   completed: false, notes: "" },
];

// ── Notes / Links ────────────────────────────────────────────────────────────
export type NoteLinkCategory =
  | "Lecture Notes"
  | "Assignment"
  | "Reference"
  | "Lab"
  | "Project"
  | "Tutorial"
  | "Other";

export type NoteLink = {
  id: string;
  title: string;
  url: string;
  category: NoteLinkCategory;
  subject: string;   // course name / topic
  date: string;      // ISO date
};

export const NOTE_CATEGORY_COLORS: Record<NoteLinkCategory, string> = {
  "Lecture Notes": "bg-primary/15 text-primary border-primary/30",
  "Assignment":    "bg-destructive/15 text-destructive border-destructive/30",
  "Reference":     "bg-secondary/15 text-secondary border-secondary/30",
  "Lab":           "bg-warning/15 text-warning border-warning/30",
  "Project":       "bg-purple-400/15 text-purple-300 border-purple-400/30",
  "Tutorial":      "bg-sky-400/15 text-sky-300 border-sky-400/30",
  "Other":         "bg-muted text-muted-foreground border-border",
};

// ── AI Pipeline ──────────────────────────────────────────────────────────────
export type PipelineStage = {
  id: number; title: string; status: "not_started" | "in_progress" | "completed";
};

export const INITIAL_PIPELINE: PipelineStage[] = [
  { id: 1, title: "Python & Math Fundamentals (Stats, Linear Algebra)",       status: "completed"  },
  { id: 2, title: "SQL, Databases & Data Preprocessing (DBMS Alignment)",     status: "in_progress"},
  { id: 3, title: "Classical Machine Learning Algorithms",                    status: "not_started"},
  { id: 4, title: "Deep Learning (PyTorch / TensorFlow)",                     status: "not_started"},
  { id: 5, title: "Bangla NLP & Transformers (Hugging Face)",                 status: "not_started"},
  { id: 6, title: "LLM Architectures, RAG & Retrieval Pipelines",             status: "not_started"},
  { id: 7, title: "MLOps, Model Deployment & AI Infrastructure Engineering",  status: "not_started"},
];

export type HCIPaperStage =
  | "Literature Review" | "Data Collection" | "Experimentation"
  | "Paper Drafting"    | "Conference Submission";

export type HCITracker = { stage: HCIPaperStage; notes: string; papersPublished: number; };
export const INITIAL_HCI: HCITracker = { stage: "Literature Review", notes: "", papersPublished: 0 };

// ── Certificates ─────────────────────────────────────────────────────────────
export type CertProvider = "IBM" | "Coursera" | "Microsoft" | "Google" | "Other";

export type Certificate = {
  id: string; title: string; provider: CertProvider; platform: string;
  category: string; status: "Not Started" | "In Progress" | "Completed";
  completionDate: string; certificateUrl: string; credentialId: string; notes: string;
};

export const INITIAL_CERTIFICATES: Certificate[] = [
  { id:"c1", title:"IBM AI Developer Professional Certificate",    provider:"IBM",      platform:"Coursera",                    category:"AI/ML",     status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"12-course series. Priority path." },
  { id:"c2", title:"IBM Machine Learning Professional Certificate",provider:"IBM",      platform:"Coursera",                    category:"AI/ML",     status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"ML + Scikit-learn + IBM Watson." },
  { id:"c3", title:"IBM Applied AI with Deep Learning",            provider:"IBM",      platform:"Coursera",                    category:"Deep Learning",status:"Not Started",completionDate:"", certificateUrl:"", credentialId:"", notes:"Keras, PyTorch, TensorFlow." },
  { id:"c4", title:"Deep Learning Specialization",                 provider:"Coursera", platform:"Coursera (DeepLearning.AI)",  category:"Deep Learning",status:"Not Started",completionDate:"", certificateUrl:"", credentialId:"", notes:"Andrew Ng. 5 courses." },
  { id:"c5", title:"Machine Learning Specialization",              provider:"Coursera", platform:"Coursera (DeepLearning.AI)",  category:"AI/ML",     status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"Andrew Ng. 3 courses. Updated 2023." },
  { id:"c6", title:"MLOps Specialization",                         provider:"Coursera", platform:"Coursera (DeepLearning.AI)",  category:"MLOps",     status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"4-course series. CI/CD for ML." },
  { id:"c7", title:"NLP Specialization",                           provider:"Coursera", platform:"Coursera (DeepLearning.AI)",  category:"NLP",       status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"4 courses. Transformers, RAG." },
  { id:"c8", title:"Azure AI Engineer Associate (AI-102)",          provider:"Microsoft",platform:"Microsoft Learn",              category:"Cloud AI",  status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"Official MS cert. Highly valued." },
  { id:"c9", title:"Azure Data Scientist Associate (DP-100)",       provider:"Microsoft",platform:"Microsoft Learn",              category:"Cloud AI",  status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"Azure ML Studio + Pipelines." },
  { id:"c10",title:"GitHub Copilot Fundamentals",                  provider:"Microsoft",platform:"Microsoft Learn",              category:"DevOps",    status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"AI-assisted coding. Quick win." },
];

// ── MS Abroad ─────────────────────────────────────────────────────────────────
export type DistractionLog = {
  academics: number; ai: number; research: number; quran: number;
  ielts: number; familyBuffer: number; waste: number;
};
export const INITIAL_DISTRACTION_LOG: DistractionLog = {
  academics:20, ai:15, research:5, quran:7, ielts:5, familyBuffer:7, waste:2,
};

export type DocumentChecklist = {
  id: string; task: string; status: "Not Started" | "In Progress" | "Done"; meta?: string;
};
export const INITIAL_DOCUMENTS: DocumentChecklist[] = [
  { id:"1",  task:"Passport & NID Name Correction",          status:"Not Started", meta:"Verify spelling alignment"    },
  { id:"2",  task:"Academic Transcripts",                    status:"Not Started", meta:"Official from Registrar office"},
  { id:"3",  task:"SSC/HSC Certificates collection",         status:"Done"                                             },
  { id:"4",  task:"Certificate Attestation",                 status:"Not Started", meta:"Education & Foreign Ministry" },
  { id:"5",  task:"SOP (Statement of Purpose) Master Draft", status:"In Progress"                                      },
  { id:"6",  task:"LOR Professor 1",                         status:"Not Started"                                      },
  { id:"7",  task:"LOR Professor 2",                         status:"Not Started"                                      },
  { id:"8",  task:"LOR Professor 3",                         status:"Not Started"                                      },
  { id:"9",  task:"CV / Academic Resume",                    status:"In Progress", meta:"ATS-optimized"                },
  { id:"10", task:"Research Statement",                      status:"Not Started"                                      },
];

export type Scholarship = {
  id: string; name: string; country: string; deadline: string;
  status: "Researching" | "Applying" | "Applied" | "Result";
  metRequirements: boolean; notes?: string;
};
export const INITIAL_SCHOLARSHIPS: Scholarship[] = [
  { id:"1",  name:"Fulbright Foreign Student",        country:"🇺🇸 USA",        deadline:"2028-10-15", status:"Researching", metRequirements:false, notes:"Fully funded. GRE optional. CGPA 3.7+ preferred."          },
  { id:"2",  name:"Chevening",                        country:"🇬🇧 UK",         deadline:"2028-11-04", status:"Researching", metRequirements:false, notes:"Leadership-focused. Strong LORs needed."                    },
  { id:"3",  name:"DAAD Research Grants",             country:"🇩🇪 Germany",    deadline:"2028-10-31", status:"Researching", metRequirements:false, notes:"Research-aligned. German prof contact helps."               },
  { id:"4",  name:"Erasmus Mundus Joint Master",      country:"🇪🇺 EU",         deadline:"2029-01-15", status:"Researching", metRequirements:false, notes:"Study in 2+ EU countries. Strong CS/AI programs."           },
  { id:"5",  name:"Erasmus+ (Study Abroad)",          country:"🇪🇺 EU",         deadline:"2028-03-31", status:"Researching", metRequirements:false, notes:"Requires UIU bilateral agreement. Check Int'l Office."      },
  { id:"6",  name:"Gates Cambridge",                  country:"🇬🇧 UK",         deadline:"2028-12-01", status:"Researching", metRequirements:false, notes:"Cambridge admission + Gates review. Very competitive."       },
  { id:"7",  name:"Stipendium Hungaricum",            country:"🇭🇺 Hungary",    deadline:"2029-01-15", status:"Researching", metRequirements:false, notes:"Apply via Bangladesh MoFA. Full scholarship."               },
  { id:"8",  name:"Swedish Institute Scholarships",   country:"🇸🇪 Sweden",     deadline:"2029-02-14", status:"Researching", metRequirements:false, notes:"Leadership + sustainability focus."                         },
  { id:"9",  name:"ETH Zurich Excellence Scholarship",country:"🇨🇭 Switzerland",deadline:"2028-12-01", status:"Researching", metRequirements:false, notes:"ETH direct admission required first. Top-tier AI."          },
  { id:"10", name:"NUS Research Scholarship",         country:"🇸🇬 Singapore",  deadline:"2028-11-15", status:"Researching", metRequirements:false, notes:"Strong AI/ML dept. Monthly stipend SGD 2,700."             },
  { id:"11", name:"Korean Government Scholarship (KGSP)",country:"🇰🇷 South Korea",deadline:"2028-09-30",status:"Researching",metRequirements:false,notes:"Full fund. KAIST, POSTECH options. AI research fit."        },
];

export type Internship = {
  id: string; name: string; deadline: string;
  status: "Not Applied" | "Applied" | "Interview" | "Accepted" | "Rejected"; notes: string;
};
export const INITIAL_INTERNSHIPS: Internship[] = [
  { id:"1", name:"Microsoft Learn Student Ambassador (MLSA)", deadline:"Rolling",    status:"Not Applied", notes:"" },
  { id:"2", name:"Google Developer Group (GDG)",              deadline:"TBA",        status:"Not Applied", notes:"" },
  { id:"3", name:"IBM Community Student Lead",                deadline:"TBA",        status:"Not Applied", notes:"" },
  { id:"4", name:"Coursera Campus Partner",                   deadline:"TBA",        status:"Not Applied", notes:"" },
  { id:"5", name:"NASA Internship",                           deadline:"2028-11-01", status:"Not Applied", notes:"" },
];

// ── Spiritual ─────────────────────────────────────────────────────────────────
export type DailyQuranRecord = {
  date: string; implemented: boolean; ayah: string; meaning: string; reflection: string;
  prayers: { fajr:boolean; dhuhr:boolean; asr:boolean; maghrib:boolean; isha:boolean; };
};

// ── Store hook ────────────────────────────────────────────────────────────────
export function useAppStore() {
  const [courses, setCourses]               = useLocalStorage<Course[]>          ("life_tracker_courses",          INITIAL_COURSES);
  const [currentTrimester, setCurrentTrimester] = useLocalStorage<string>        ("life_tracker_current_trimester", INITIAL_CURRENT_TRIMESTER);
  const [reviews, setReviews]               = useLocalStorage<SelfReview[]>      ("life_tracker_reviews",          INITIAL_REVIEWS);
  const [noteLinks, setNoteLinks]           = useLocalStorage<NoteLink[]>        ("life_tracker_note_links",        []);
  const [pipeline, setPipeline]             = useLocalStorage<PipelineStage[]>   ("life_tracker_pipeline",         INITIAL_PIPELINE);
  const [hci, setHci]                       = useLocalStorage<HCITracker>        ("life_tracker_hci",              INITIAL_HCI);
  const [distractionLog, setDistractionLog] = useLocalStorage<DistractionLog>    ("life_tracker_distractions",     INITIAL_DISTRACTION_LOG);
  const [documents, setDocuments]           = useLocalStorage<DocumentChecklist[]>("life_tracker_documents",       INITIAL_DOCUMENTS);
  const [scholarships, setScholarships]     = useLocalStorage<Scholarship[]>     ("life_tracker_scholarships",     INITIAL_SCHOLARSHIPS);
  const [internships, setInternships]       = useLocalStorage<Internship[]>      ("life_tracker_internships",      INITIAL_INTERNSHIPS);
  const [certificates, setCertificates]     = useLocalStorage<Certificate[]>     ("life_tracker_certificates",     INITIAL_CERTIFICATES);
  const [vocab, setVocab]                   = useLocalStorage<{word:string;date:string}[]>("life_tracker_vocab",   []);
  const [mockTests, setMockTests]           = useLocalStorage<{date:string;listening:number;reading:number;writing:number;speaking:number;overall:number}[]>("life_tracker_mock_tests",[]);
  const [cambridgeTests, setCambridgeTests] = useLocalStorage<number>            ("life_tracker_cambridge_tests",  0);
  const [spiritualLogs, setSpiritualLogs]   = useLocalStorage<Record<string, DailyQuranRecord>>("life_tracker_spiritual", {});

  return {
    courses, setCourses,
    currentTrimester, setCurrentTrimester,
    reviews, setReviews,
    noteLinks, setNoteLinks,
    pipeline, setPipeline,
    hci, setHci,
    distractionLog, setDistractionLog,
    documents, setDocuments,
    scholarships, setScholarships,
    internships, setInternships,
    certificates, setCertificates,
    vocab, setVocab,
    mockTests, setMockTests,
    cambridgeTests, setCambridgeTests,
    spiritualLogs, setSpiritualLogs,
  };
}
