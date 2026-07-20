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
  // Sem 242
  { id: "1", code: "MATH101", title: "Discrete Math", credits: 3, grade: "A", gpa: 4.00, semester: "242", status: "completed" },
  { id: "2", code: "CSE101", title: "Intro to Computer Systems", credits: 1, grade: "A", gpa: 4.00, semester: "242", status: "completed" },
  { id: "3", code: "ENG101", title: "English I", credits: 3, grade: "B+", gpa: 3.33, semester: "242", status: "completed" },
  { id: "4", code: "HIST101", title: "History of Bangladesh", credits: 2, grade: "A", gpa: 4.00, semester: "242", status: "completed" },
  // Sem 243
  { id: "5", code: "CSE103", title: "Structured Programming", credits: 3, grade: "A", gpa: 4.00, semester: "243", status: "completed" },
  { id: "6", code: "CSE104", title: "SPL Lab", credits: 1, grade: "A", gpa: 4.00, semester: "243", status: "completed" },
  { id: "7", code: "CSE105", title: "Digital Logic", credits: 3, grade: "A", gpa: 4.00, semester: "243", status: "completed" },
  { id: "8", code: "CSE106", title: "DLD Lab", credits: 1, grade: "A", gpa: 4.00, semester: "243", status: "completed" },
  { id: "9", code: "MATH103", title: "Fundamental Calculus", credits: 3, grade: "A", gpa: 4.00, semester: "243", status: "completed" },
  // Sem 251
  { id: "10", code: "CSE203", title: "OOP", credits: 3, grade: "A", gpa: 4.00, semester: "251", status: "completed" },
  { id: "11", code: "CSE204", title: "OOP Lab", credits: 1, grade: "A", gpa: 4.00, semester: "251", status: "completed" },
  { id: "12", code: "MATH201", title: "Calculus & Linear Algebra", credits: 3, grade: "A", gpa: 4.00, semester: "251", status: "completed" },
  { id: "13", code: "STAT201", title: "Probability & Statistics", credits: 3, grade: "A", gpa: 4.00, semester: "251", status: "completed" },
  // Sem 252
  { id: "14", code: "CSE205", title: "DSA I", credits: 3, grade: "A", gpa: 4.00, semester: "252", status: "completed" },
  { id: "15", code: "CSE206", title: "DSA I Lab", credits: 1, grade: "A", gpa: 4.00, semester: "252", status: "completed" },
  { id: "16", code: "CSE207", title: "Theory of Computation", credits: 3, grade: "A", gpa: 4.00, semester: "252", status: "completed" },
  { id: "17", code: "MATH203", title: "Coordinate Geometry", credits: 3, grade: "A", gpa: 4.00, semester: "252", status: "completed" },
  // Sem 253
  { id: "18", code: "CSE209", title: "DSA II", credits: 3, grade: "A", gpa: 4.00, semester: "253", status: "completed" },
  { id: "19", code: "CSE210", title: "DSA II Lab", credits: 1, grade: "A", gpa: 4.00, semester: "253", status: "completed" },
  { id: "20", code: "EEE201", title: "Electrical Circuits", credits: 3, grade: "A", gpa: 4.00, semester: "253", status: "completed" },
  { id: "21", code: "PHY101", title: "Physics", credits: 3, grade: "A", gpa: 4.00, semester: "253", status: "completed" },
  { id: "22", code: "PHY102", title: "Physics Lab", credits: 1, grade: "A", gpa: 4.00, semester: "253", status: "completed" },
  // Sem 262 (Running)
  { id: "23", code: "CSE3313", title: "Computer Architecture", credits: 3, grade: "A", gpa: 4.00, semester: "262", status: "running" },
  { id: "24", code: "CSE3521", title: "Database Management Systems", credits: 3, grade: "A", gpa: 4.00, semester: "262", status: "running" },
  { id: "25", code: "EEE2123", title: "Electronics", credits: 3, grade: "A", gpa: 4.00, semester: "262", status: "running" },
  { id: "26", code: "EEE2124", title: "Electronics Lab", credits: 1, grade: "A", gpa: 4.00, semester: "262", status: "running" },
];

export type SelfReview = {
  id: string;
  task: string;
  duration: string;
  completed: boolean;
  notes: string;
};

export const INITIAL_REVIEWS: SelfReview[] = [
  { id: "1", task: "DSA Fundamentals Revision", duration: "1.5 hrs", completed: false, notes: "" },
  { id: "2", task: "Mathematics Core Review", duration: "1.5 hrs", completed: false, notes: "" },
  { id: "3", task: "Structured Programming Practice", duration: "1 hr", completed: false, notes: "" },
];

export type PipelineStage = {
  id: number;
  title: string;
  status: "not_started" | "in_progress" | "completed";
};

export const INITIAL_PIPELINE: PipelineStage[] = [
  { id: 1, title: "Python & Math Fundamentals (Stats, Linear Algebra)", status: "completed" },
  { id: 2, title: "SQL, Databases & Data Preprocessing (DBMS Alignment)", status: "in_progress" },
  { id: 3, title: "Classical Machine Learning Algorithms", status: "not_started" },
  { id: 4, title: "Deep Learning (PyTorch / TensorFlow)", status: "not_started" },
  { id: 5, title: "Bangla NLP & Transformers (Hugging Face)", status: "not_started" },
  { id: 6, title: "LLM Architectures & RAG", status: "not_started" },
  { id: 7, title: "MLOps, Model Deployment & Production Infrastructure", status: "not_started" },
];

export type HCIPaperStage = "Literature Review" | "Data Collection" | "Experimentation" | "Paper Drafting" | "Conference Submission";
export type HCITracker = {
  stage: HCIPaperStage;
  notes: string;
  papersPublished: number;
};
export const INITIAL_HCI: HCITracker = {
  stage: "Literature Review",
  notes: "",
  papersPublished: 0,
};

export type DistractionLog = {
  academics: number;
  ai: number;
  research: number;
  quran: number;
  ielts: number;
  familyBuffer: number;
  waste: number;
};

export const INITIAL_DISTRACTION_LOG: DistractionLog = {
  academics: 20,
  ai: 15,
  research: 5,
  quran: 7,
  ielts: 5,
  familyBuffer: 7,
  waste: 2,
};

export type DocumentChecklist = {
  id: string;
  task: string;
  status: "Not Started" | "In Progress" | "Done";
  meta?: string;
};

export const INITIAL_DOCUMENTS: DocumentChecklist[] = [
  { id: "1", task: "Passport & NID Name Correction", status: "Not Started", meta: "Verify spelling alignment" },
  { id: "2", task: "Academic Transcripts", status: "Not Started", meta: "Official from Registrar office" },
  { id: "3", task: "SSC/HSC Certificates collection", status: "Done" },
  { id: "4", task: "Certificate Attestation", status: "Not Started", meta: "Education & Foreign Ministry" },
  { id: "5", task: "SOP (Statement of Purpose) Master Draft", status: "In Progress" },
  { id: "6", task: "LOR Professor 1", status: "Not Started" },
  { id: "7", task: "LOR Professor 2", status: "Not Started" },
  { id: "8", task: "LOR Professor 3", status: "Not Started" },
  { id: "9", task: "CV / Academic Resume", status: "In Progress", meta: "ATS-optimized" },
  { id: "10", task: "Research Statement", status: "Not Started" },
];

export type Scholarship = {
  id: string;
  name: string;
  country: string;
  deadline: string;
  status: "Researching" | "Applying" | "Applied" | "Result";
  metRequirements: boolean;
};

export const INITIAL_SCHOLARSHIPS: Scholarship[] = [
  { id: "1", name: "Fulbright", country: "US", deadline: "2024-10-15", status: "Researching", metRequirements: false },
  { id: "2", name: "Chevening", country: "UK", deadline: "2024-11-01", status: "Researching", metRequirements: false },
  { id: "3", name: "DAAD", country: "Germany", deadline: "2024-10-31", status: "Researching", metRequirements: false },
  { id: "4", name: "Erasmus Mundus", country: "EU", deadline: "2025-01-15", status: "Researching", metRequirements: false },
  { id: "5", name: "Gates Cambridge", country: "UK", deadline: "2024-12-01", status: "Researching", metRequirements: false },
  { id: "6", name: "Stipendium Hungaricum", country: "Hungary", deadline: "2025-01-15", status: "Researching", metRequirements: false },
  { id: "7", name: "Swedish Institute", country: "Sweden", deadline: "2025-02-20", status: "Researching", metRequirements: false },
  { id: "8", name: "ETH Zurich Excellence", country: "Switzerland", deadline: "2024-12-15", status: "Researching", metRequirements: false },
  { id: "9", name: "NUS Research Scholarship", country: "Singapore", deadline: "2024-11-15", status: "Researching", metRequirements: false },
];

export type Internship = {
  id: string;
  name: string;
  deadline: string;
  status: "Not Applied" | "Applied" | "Interview" | "Accepted" | "Rejected";
  notes: string;
};

export const INITIAL_INTERNSHIPS: Internship[] = [
  { id: "1", name: "Microsoft Learn Student Ambassador (MLSA)", deadline: "Rolling", status: "Not Applied", notes: "" },
  { id: "2", name: "Google Developer Group (GDG)", deadline: "TBA", status: "Not Applied", notes: "" },
  { id: "3", name: "IBM Community Student Lead", deadline: "TBA", status: "Not Applied", notes: "" },
  { id: "4", name: "Coursera Campus Partner", deadline: "TBA", status: "Not Applied", notes: "" },
  { id: "5", name: "NASA Internship", deadline: "2024-11-01", status: "Not Applied", notes: "" },
];

export type DailyQuranRecord = {
  date: string;
  implemented: boolean;
  ayah: string;
  meaning: string;
  reflection: string;
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
};

export function useAppStore() {
  const [courses, setCourses] = useLocalStorage<Course[]>("life_tracker_courses", INITIAL_COURSES);
  const [reviews, setReviews] = useLocalStorage<SelfReview[]>("life_tracker_reviews", INITIAL_REVIEWS);
  const [pipeline, setPipeline] = useLocalStorage<PipelineStage[]>("life_tracker_pipeline", INITIAL_PIPELINE);
  const [hci, setHci] = useLocalStorage<HCITracker>("life_tracker_hci", INITIAL_HCI);
  const [distractionLog, setDistractionLog] = useLocalStorage<DistractionLog>("life_tracker_distractions", INITIAL_DISTRACTION_LOG);
  const [documents, setDocuments] = useLocalStorage<DocumentChecklist[]>("life_tracker_documents", INITIAL_DOCUMENTS);
  const [scholarships, setScholarships] = useLocalStorage<Scholarship[]>("life_tracker_scholarships", INITIAL_SCHOLARSHIPS);
  const [internships, setInternships] = useLocalStorage<Internship[]>("life_tracker_internships", INITIAL_INTERNSHIPS);
  
  const [vocab, setVocab] = useLocalStorage<{word: string, date: string}[]>("life_tracker_vocab", []);
  const [mockTests, setMockTests] = useLocalStorage<{date: string, listening: number, reading: number, writing: number, speaking: number, overall: number}[]>("life_tracker_mock_tests", []);
  const [cambridgeTests, setCambridgeTests] = useLocalStorage<number>("life_tracker_cambridge_tests", 0);
  
  const [spiritualLogs, setSpiritualLogs] = useLocalStorage<Record<string, DailyQuranRecord>>("life_tracker_spiritual", {});

  return {
    courses, setCourses,
    reviews, setReviews,
    pipeline, setPipeline,
    hci, setHci,
    distractionLog, setDistractionLog,
    documents, setDocuments,
    scholarships, setScholarships,
    internships, setInternships,
    vocab, setVocab,
    mockTests, setMockTests,
    cambridgeTests, setCambridgeTests,
    spiritualLogs, setSpiritualLogs,
  };
}
